/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import * as t from "io-ts";
import { PaymentDataBase } from "./PaymentDataBase";
import { Payee } from "./Payee";

// required attributes
const PaymentDataWithRequiredPayee2R = t.interface({
  payee: Payee,
});

// optional attributes
const PaymentDataWithRequiredPayee2O = t.partial({});

export const PaymentDataWithRequiredPayee2 = t.exact(
  t.intersection(
    [PaymentDataWithRequiredPayee2R, PaymentDataWithRequiredPayee2O],
    "PaymentDataWithRequiredPayee2"
  )
);

export type PaymentDataWithRequiredPayee2 = t.TypeOf<
  typeof PaymentDataWithRequiredPayee2
>;

export const PaymentDataWithRequiredPayee = t.intersection(
  [PaymentDataBase, PaymentDataWithRequiredPayee2],
  "PaymentDataWithRequiredPayee"
);

export type PaymentDataWithRequiredPayee = t.TypeOf<
  typeof PaymentDataWithRequiredPayee
>;