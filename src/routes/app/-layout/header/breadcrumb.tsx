"use client";
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

  // Array formatındaki crumb'ları topla
  const items = matches
    .map((match) => {
      const { loaderData } = match;

      // Array formatında crumb döndürüyorsa o array'i al
      if (Array.isArray(loaderData?.crumb)) {
        return loaderData.crumb;
      }

      // String formatında crumb varsa eski formatta işle
      if (loaderData?.crumb) {
        return [
          {
            href: match.pathname,
            label: loaderData.crumb,
          },
        ];
      }

      return null;
    })
    .filter(Boolean)
    .flat(); // Array'leri birleştir

  if (items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {items.map((crumb, index) => (
          <Fragment key={crumb?.href || index}>
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
