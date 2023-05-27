import React from "react";
import {
  SessionAuth,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import {
  UserRoleClaim /*PermissionClaim*/,
} from "supertokens-auth-react/recipe/userroles";

const AdminRoute = (props) => {
  console.log("UserRoleClaim: ", UserRoleClaim);

  return (
    <SessionAuth
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
      ]}
    >
      <InvalidClaimHandler>{props.children}</InvalidClaimHandler>
    </SessionAuth>
  );
};

function InvalidClaimHandler(props) {
  let sessionContext = useSessionContext();
  if (sessionContext.loading) {
    return null;
  }

  if (
    sessionContext.invalidClaims.some((i) => i.validatorId === UserRoleClaim.id)
  ) {
    return <div>You cannot access this page because you are not an admin.</div>;
  }

  return <div>{props.children}</div>;
}

export default AdminRoute;
