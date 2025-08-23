import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BadgeCheck, Wallet, Trophy, Coins, KeySquare } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      icon: <BadgeCheck className="w-6 h-6 text-[rgba(0,255,217,1)]" />,
      question: "What is NullProof?",
      answer:
        "NullProof is a ZK-based identity protocol that allows users to prove who they are without revealing sensitive details, ensuring privacy-first identity verification.",
    },
    {
      icon: <Wallet className="w-6 h-6 text-[rgba(0,255,217,1)]" />,
      question: "How does the Degen Score work?",
      answer:
        "Your Degen Score is calculated using multiple on-chain and off-chain parameters, analyzing wallet activity, transaction history, and other relevant stats.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-[rgba(0,255,217,1)]" />,
      question: "Can I mint badges?",
      answer:
        "Yes! Based on your activity and Degen Score, you can mint special badges that showcase your on-chain achievements.",
    },
    {
      icon: <Coins className="w-6 h-6 text-[rgba(0,255,217,1)]" />,
      question: "What is Certo ($CRT) token used for?",
      answer:
        "Certo ($CRT) is the utility token within the NullProof ecosystem. You can earn it through platform activities and use it for premium features, governance, and marketplace access.",
    },
    {
      icon: <KeySquare className="w-6 h-6 text-[rgba(0,255,217,1)]" />,
      question: "How do Verifiable Credentials work?",
      answer:
        "Verifiable Credentials let you share proof of achievements or identity without exposing unnecessary personal details, powered by advanced ZK cryptography.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-transparent text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[rgba(0,255,217,1)]">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <Card className="bg-zinc-900/50 rounded-2xl mb-4">
                <CardContent className="flex items-center gap-4 p-4">
                  {faq.icon}
                  <div className="flex-1">
                    <AccordionTrigger className="text-lg font-semibold text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="mt-2 text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </div>
                </CardContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
