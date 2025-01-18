"use client";

import { useState } from "react";
import RSA from "@/components/rsa";
import SHA256 from "@/components/sha256";
import AES from "@/components/aes";

export default function DashboardPage() {
  const tabs = [
    { id: "aes", label: "AES", component: <AES /> },
    { id: "rsa", label: "RSA", component: <RSA /> },
    { id: "sha256", label: "SHA256", component: <SHA256 /> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const renderActiveTabContent = () => {
    const active = tabs.find((tab) => tab.id === activeTab);
    return active?.component || null;
  };

  return (
    <div className="">
      <div className="flex space-x-4 border-b border-muted-foreground">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="">{renderActiveTabContent()}</div>
    </div>
  );
}
