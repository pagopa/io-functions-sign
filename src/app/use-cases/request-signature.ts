import { FiscalCode } from "@pagopa/ts-commons/lib/strings";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { sequenceS } from "fp-ts/lib/Apply";
import { Subscription } from "../../signature-request/subscription";
import { GetSignerByFiscalCode } from "../../signer/signer";

import {
  SignatureRequest,
  AddSignatureRequest,
} from "../../signature-request/signature-request";
import { id } from "../../id";
import {
  Product,
  GetProduct,
  getDocumentsByMetadata,
  productNotFoundError,
} from "../../signature-request/product";
import { timestamps } from "../../timestamps";

export type RequestSignaturePayload = {
  subscriptionId: Subscription["id"];
  fiscalCode: FiscalCode;
  productId: Product["id"];
};

export const makeRequestSignature =
  (
    getSignerByFiscalCode: GetSignerByFiscalCode,
    getProduct: GetProduct,
    addSignatureRequest: AddSignatureRequest
  ) =>
  (payload: RequestSignaturePayload): TE.TaskEither<Error, SignatureRequest> =>
    pipe(
      sequenceS(TE.ApplySeq)({
        signer: getSignerByFiscalCode(payload.fiscalCode),
        documents: pipe(
          getProduct(payload.productId, payload.subscriptionId),
          TE.chainW(TE.fromOption(() => productNotFoundError)),
          TE.chainEitherK(getDocumentsByMetadata)
        ),
      }),
      TE.map(
        ({ signer, documents }): SignatureRequest => ({
          id: id(),
          subscriptionId: payload.subscriptionId,
          productId: payload.productId,
          signerId: signer.id,
          documents,
          ...timestamps(),
        })
      ),
      TE.chainFirst(addSignatureRequest)
    );
