/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import { ProductId } from "./ProductId";
import { FiscalCode } from "./FiscalCode";
import { ExpirationDateTime } from "./ExpirationDateTime";
import * as t from "io-ts";

// required attributes
const RequestSignatureBodyR = t.interface({
  productId: ProductId,

  fiscalCode: FiscalCode,
});

// optional attributes
const RequestSignatureBodyO = t.partial({
  expiryAt: ExpirationDateTime,
});

export const RequestSignatureBody = t.exact(
  t.intersection(
    [RequestSignatureBodyR, RequestSignatureBodyO],
    "RequestSignatureBody"
  )
);

export type RequestSignatureBody = t.TypeOf<typeof RequestSignatureBody>;
