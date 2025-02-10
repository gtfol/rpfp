"use client";

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Profile } from "@/types/data";
import { toast } from "sonner";
import { Tables } from "@/types/db";

// Define a type for the plan
interface Plan {
  userDetails: Tables<"profiles"> | null;
  userEmail: string | null;
  title: string;
  description: string;
  price: string;
  features: string[];
}

interface PayDialogProps {
  userDetails: Tables<"profiles"> | null;
  userEmail: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const PlanCard: React.FC<Plan> = ({
  userDetails,
  userEmail,
  title,
  description,
  price,
  features,
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false);

  const handleDirectToPaymentLink = async () => {
    if (!userDetails) {
      toast.error("User not found");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/create-checkout-session", {
        user_id: userDetails.id,
        email: userEmail,
        plan_name: "Remove People from Photos Pro Plan",
      });

      router.push(response.data.paymentLink);
    } catch (error) {
      toast.error("Failed to create checkout session");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!userDetails) {
      toast.error("User not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription_id: userDetails.subscription_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      toast.success("Your subscription has been cancelled");
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("Failed to cancel subscription");
    } finally {
      setLoading(false);
    }
  };

  if (!userDetails) {
    return null;
  }

  return (
    <>
      <Card
        className={title.includes("Pro") ? "border border-emerald-400" : ""}
      >
        <CardHeader className="flex flex-col items-start space-y-2">
          <div className="flex flex-col items-start space-y-2">
            <CardTitle className="font-bold">{title}</CardTitle>
            <CardDescription className="text-sm font-normal">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-start space-y-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-semibold">{price}</span>
            <span className="text-sm font-medium opacity-50">/month</span>
          </div>
          <ul className="grid gap-2 text-left">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center">
          {title.includes("Free") ? (
            userDetails.paid ? (
              <Button
                onClick={() => setIsConfirmDialogOpen(true)}
                disabled={false}
              >
                {loading ? "Please wait" : "Cancel Subscription"}
              </Button>
            ) : (
              <Button disabled={true}>
                {loading ? "Please wait" : "Current Plan"}
              </Button>
            )
          ) : title.includes("Pro") ? (
            userDetails.paid ? (
              <Button disabled={true}>
                {loading ? "Please wait" : "Current Plan"}
              </Button>
            ) : (
              <Button onClick={handleDirectToPaymentLink} disabled={loading}>
                {loading ? "Please wait" : "Upgrade"}
              </Button>
            )
          ) : null}
        </CardFooter>
      </Card>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your plan? This will cancel your
              current subscription.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleCancelSubscription}
              disabled={loading}
              variant={"destructive"}
            >
              {loading ? "Please wait" : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Define the PayDialog component
const PayDialog: React.FC<PayDialogProps> = ({
  userDetails,
  userEmail,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payment Plans</DialogTitle>
          <DialogDescription>
            Please select a payment plan below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-w-sm gap-6 md:max-w-none md:grid-cols-2">
          <PlanCard
            userDetails={userDetails}
            userEmail={userEmail}
            title="Free"
            description="The text behind image experience with some limitations"
            price="$0"
            features={[
              "2 free generations / account",
              "Access to 6 free fonts",
            ]}
          />
          <PlanCard
            userDetails={userDetails}
            userEmail={userEmail}
            title="Pro ✨"
            description="Everything in the free plan, plus more that makes your tbi designs better"
            price="$4"
            features={[
              "Unlimited generations / account",
              "Access to all 250 fonts",
            ]}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayDialog;
