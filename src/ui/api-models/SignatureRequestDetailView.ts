/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import { Document } from "./Document";
import * as t from "io-ts";

// required attributes
const SignatureRequestDetailViewR = t.interface({
  id: t.string,

  productId: t.string,

  documents: t.readonlyArray(Document, "array of Document"),
});

// optional attributes
const SignatureRequestDetailViewO = t.partial({});

export const SignatureRequestDetailView = t.exact(
  t.intersection(
    [SignatureRequestDetailViewR, SignatureRequestDetailViewO],
    "SignatureRequestDetailView"
  )
);

export type SignatureRequestDetailView = t.TypeOf<
  typeof SignatureRequestDetailView
>;
