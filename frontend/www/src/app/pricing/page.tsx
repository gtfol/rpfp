"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import clsx from "clsx";
import { Footer } from "@/components/footer";
import { motion as m } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  interface Plan {
    name: string;
    price: string;
    priceSuffix: string;
    features: { name: string; included: boolean }[];
    cta: string;
    label?: string;
    type: "primary" | "surface" | "outline";
  }

  const plans: Plan[] = [
    {
      name: "Free",
      price: "$0",
      priceSuffix: "/ month",
      features: [
        { name: "Unlimited photos", included: true },
        { name: "Resolution up to 720p", included: true },
      ],
      cta: "Start for free",
      type: "surface",
    },
    {
      name: "Pro",
      price: "$4",
      label: "Most Popular",
      priceSuffix: "/ month",
      features: [
        { name: "Unlimited photos", included: true },
        { name: "Full resolution", included: true },
        { name: "Batch processing", included: true },
        { name: "Priority email support", included: true },
      ],
      cta: "Get started",
      type: "primary",
    },
    {
      name: "Enterprise",
      price: "Custom",
      priceSuffix: "",
      features: [
        { name: "Unlimited images", included: true },
        { name: "High resolution", included: true },
        { name: "Batch processing", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated email support", included: true },
      ],
      cta: "Contact us",
      type: "outline",
    },
  ];

  const handlePlanClick = (plan: Plan) => {
    switch (plan.name) {
      case "Free":
        router.push("/");
        break;
      case "Pro":
        router.push("/login");
        break;
      case "Enterprise":
        router.push("/login");
        break;
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen text-black">
      <NavBar isFixed={true} />
      <div className="mb-32 p-8">
        <div className="mx-auto max-w-7xl">
          <m.div
            className="mb-12 mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-general mb-4 text-4xl font-[550]">Pricing</h1>
            <p className="text-base text-zinc-600">
              Try for free and upgrade anytime to unlock full resolution images.
            </p>
          </m.div>

          <m.div
            className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-2 lg:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {plans.map((plan, index) => (
              <m.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className={clsx(
                  "flex flex-col justify-start rounded-xl bg-transparent",
                )}
              >
                <div className="flex w-full items-center justify-between px-2 pb-1 pt-2">
                  <p className="font-general text-sm font-medium text-zinc-900">
                    {plan.name}
                  </p>
                  {plan.label && (
                    <div
                      className={cn(
                        "rounded-lg px-2 py-1",
                        plan.type === "primary"
                          ? "bg-primary/10"
                          : "bg-zinc-100",
                      )}
                    >
                      <p
                        className={cn(
                          "text-xs font-medium",
                          plan.type === "primary"
                            ? "text-primary"
                            : "text-zinc-900",
                        )}
                      >
                        {plan.label}
                      </p>
                    </div>
                  )}
                </div>
                <div className="h-full w-full p-1">
                  <div className="relative flex h-full w-full flex-col rounded-xl bg-white p-4 shadow-sm">
                    <div className="font-general relative mb-2 text-4xl font-medium text-zinc-900">
                      {plan.price}
                      {plan.priceSuffix && (
                        <span className="ml-2 text-sm font-normal text-zinc-500">
                          {plan.priceSuffix}
                        </span>
                      )}
                    </div>
                    <div className="mb-6 mt-4 flex flex-col gap-y-4">
                      {plan.features.map((feature, index) => (
                        <div
                          key={feature.name}
                          className="flex items-center text-[13px]"
                        >
                          {feature.included ? (
                            <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                          ) : (
                            <X className="mr-2 h-5 w-5 flex-shrink-0 text-zinc-400" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-zinc-900"
                                : "text-zinc-400"
                            }
                          >
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => handlePlanClick(plan)}
                      className={clsx(
                        "relative mt-auto w-full rounded-lg py-3 font-medium transition",
                        plan.type === "primary"
                          ? "bg-primary text-white hover:brightness-110"
                          : plan.type === "outline"
                            ? "border border-primary text-primary hover:border-primary hover:bg-primary/10"
                            : "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-200",
                      )}
                    >
                      <div className="element-dark absolute inset-0 !rounded-lg">
                        <div
                          className={cn(
                            "element absolute inset-0 !rounded-[7px] opacity-30",
                          )}
                        ></div>
                      </div>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
