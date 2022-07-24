import { AzureFunction } from "@azure/functions";

import { pipe, flow } from "fp-ts/lib/function";
import { sequenceS } from "fp-ts/lib/Apply";
import * as RE from "fp-ts/lib/ReaderEither";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";

import { createHandler } from "@pagopa/handler-kit";
import {
  success,
  HttpRequest,
  path,
  error,
} from "@pagopa/handler-kit/lib/http";
import * as azure from "@pagopa/handler-kit/lib/azure";

import { requireSubscriptionId } from "../http";

import { Subscription } from "../../signature-request/subscription";

import {
  SignatureRequest,
  SignatureRequestId,
} from "../../signature-request/signature-request";
import { getSignatureRequest } from "../../infra/azure/cosmos/signature-request";
import { SignatureRequestDetailView } from "../api-models/SignatureRequestDetailView";
import { validate } from "@pagopa/handler-kit/lib/validation";

export const requireSignatureRequestId: (
  req: HttpRequest
) => E.Either<Error, SignatureRequest["id"]> = flow(
  path("signatureRequestId"),
  E.fromOption(() => new Error("Missing signatureRequestId in path")),
  E.chainW(validate(SignatureRequestId, "Invalid signatureRequestId in path"))
);

export const extractGetSignatureRequestPayload: RE.ReaderEither<
  HttpRequest,
  Error,
  {
    subscriptionId: Subscription["id"];
    signatureRequestId: SignatureRequest["id"];
  }
> = pipe(
  sequenceS(RE.Apply)({
    subscriptionId: requireSubscriptionId,
    signatureRequestId: requireSignatureRequestId,
  })
);

const decodeRequest = flow(
  azure.fromHttpRequest,
  TE.fromEither,
  TE.chainEitherK(extractGetSignatureRequestPayload)
);

const encodeSuccessResponse = flow(
  E.fromOption(() => new Error("Signature Request not found")),
  E.fold(error, success(SignatureRequestDetailView))
);

export const run: AzureFunction = pipe(
  createHandler(
    decodeRequest,
    ({ signatureRequestId, subscriptionId }) =>
      getSignatureRequest(signatureRequestId, subscriptionId),
    error,
    encodeSuccessResponse
  ),
  azure.unsafeRun
);
