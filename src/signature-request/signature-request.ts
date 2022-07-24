import * as t from "io-ts";

import { TaskEither } from "fp-ts/lib/TaskEither";
import { Option } from "fp-ts/lib/Option";
import { SignerId } from "../signer/signer";
import { Timestamps } from "../timestamps";
import { DocumentList } from "./document";
import { SubscriptionId } from "./subscription";
import { ProductId } from "./product";

export const SignatureRequestId = t.string;

export const SignatureRequestStatus = t.keyof({
  DRAFT: null,
});

export const SignatureRequest = t.intersection([
  t.type({
    id: SignatureRequestId,
    status: SignatureRequestStatus,
    signerId: SignerId,
    subscriptionId: SubscriptionId,
    productId: ProductId,
    documents: DocumentList,
  }),
  Timestamps,
]);

export type SignatureRequest = t.TypeOf<typeof SignatureRequest>;

export type GetSignatureRequest = (
  id: SignatureRequest["id"],
  subscriptionId: SignatureRequest["subscriptionId"]
) => TaskEither<Error, Option<SignatureRequest>>;

export type AddSignatureRequest = (
  request: SignatureRequest
) => TaskEither<Error, SignatureRequest>;
