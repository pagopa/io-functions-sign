/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

/**
 * The organization that runs the service. Will be added to the content
 * of sent messages to identify the sender.
 */

export type OrganizationName = t.TypeOf<typeof OrganizationName>;
export const OrganizationName = NonEmptyString;
