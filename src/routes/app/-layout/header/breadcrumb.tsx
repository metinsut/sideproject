import { Link, useMatches } from "@tanstack/react-router";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadCrumb() {
  const matches = useMatches();

  const items = matches
    .map((match) => {
      const { loaderData, pathname } = match;

      const label = loaderData?.crumb;

      if (!label) {
        return null;
      }

      return {
        href: pathname,
        label,
      };
    })
    .filter(Boolean);

  if (items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {items.map((crumb, index) => (
          <Fragment key={crumb?.href}>
            <BreadcrumbItem>
              {index === items.length - 1 ? (
                <BreadcrumbPage>{crumb?.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb?.href}>{crumb?.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
