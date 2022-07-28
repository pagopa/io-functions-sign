/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import * as t from "io-ts";
import { Service } from "./Service";
import { SubscriptionKeys } from "./SubscriptionKeys";

export const ServiceWithSubscriptionKeys = t.intersection(
  [Service, SubscriptionKeys],
  "ServiceWithSubscriptionKeys"
);

export type ServiceWithSubscriptionKeys = t.TypeOf<
  typeof ServiceWithSubscriptionKeys
>;