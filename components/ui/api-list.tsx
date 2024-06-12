"use client";

import { useParams } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";
import React from "react";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({ entityIdName, entityName }) => {
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}`}
        variant="public"
      />

      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="public"
      />
       <ApiAlert
        title="POST"
        description={`${baseUrl}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
      
      <ApiAlert
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />

    </>
  );
};

export default ApiList;
