/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import * as t from "io-ts";
import { MessageContentBase } from "./MessageContentBase";
import { PaymentDataWithRequiredPayee } from "./PaymentDataWithRequiredPayee";
import { Timestamp } from "./Timestamp";
import { PrescriptionData } from "./PrescriptionData";
import { EUCovidCert } from "./EUCovidCert";
import { ThirdPartyData } from "./ThirdPartyData";
import { LegalData } from "./LegalData";

// required attributes
const NewMessageContent2R = t.interface({});

// optional attributes
const NewMessageContent2O = t.partial({
  payment_data: PaymentDataWithRequiredPayee,

  due_date: Timestamp,

  prescription_data: PrescriptionData,

  eu_covid_cert: EUCovidCert,

  third_party_data: ThirdPartyData,

  legal_data: LegalData,
});

export const NewMessageContent2 = t.exact(
  t.intersection(
    [NewMessageContent2R, NewMessageContent2O],
    "NewMessageContent2"
  )
);

export type NewMessageContent2 = t.TypeOf<typeof NewMessageContent2>;

export const NewMessageContent = t.intersection(
  [MessageContentBase, NewMessageContent2],
  "NewMessageContent"
);

export type NewMessageContent = t.TypeOf<typeof NewMessageContent>;
