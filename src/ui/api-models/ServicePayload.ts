/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import * as t from "io-ts";
import { VisibleServicePayload } from "./VisibleServicePayload";
import { HiddenServicePayload } from "./HiddenServicePayload";

/**
 * A payload used to create/update a service for a user.
 */

export const ServicePayload = t.union(
  [VisibleServicePayload, HiddenServicePayload],
  "ServicePayload"
);

export type ServicePayload = t.TypeOf<typeof ServicePayload>;