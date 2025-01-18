import React, { useState } from "react";
import { Shield, AlertTriangle } from "lucide-react";
import { InterceptedMessage } from "@/types";

const MITMSimulation = () => {
  const [messages, setMessages] = useState<InterceptedMessage[]>([]);
  const [interceptEnabled, setInterceptEnabled] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<InterceptedMessage | null>(null);
  const [modifiedContent, setModifiedContent] = useState("");

  const generateMessage = () => {
    const newMessage: InterceptedMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: "Alice",
      recipient: "Bob",
      content: "Transfer $1000 to account #12345",
      timestamp: Date.now(),
      sessionKey: Math.random().toString(36).substring(2, 16),
      isIntercepted: interceptEnabled,
      isModified: false,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const interceptMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, isIntercepted: true, originalContent: msg.content }
          : msg
      )
    );
  };

  const modifyMessage = (messageId: string, newContent: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, content: newContent, isModified: true }
          : msg
      )
    );
    setModifiedContent("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Shield
            className={interceptEnabled ? "text-red-500" : "text-green-500"}
          />
          Man-in-the-Middle Attack Simulation
        </h2>
        {/* <button
          onClick={() => setInterceptEnabled(!interceptEnabled)}
          className={`px-4 py-2 rounded-lg ${
            interceptEnabled
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {interceptEnabled ? 'Disable Interception' : 'Enable Interception'}
        </button> */}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-medium mb-4">
          Learning Resources: MITM Attacks
        </h3>

        <div className="space-y-12">
          <div className="text-lg">
            <p className="mb-6">
              A <strong>Man-in-the-Middle (MITM)</strong> attack occurs when an
              attacker secretly intercepts and possibly alters the communication
              between two parties without their knowledge. This is a serious
              security vulnerability where the attacker can eavesdrop,
              manipulate data, or even impersonate one of the parties.
            </p>

            <p className="mb-6">
              Think of it like someone secretly listening to your private
              conversation and changing what one party hears. In cybersecurity,
              this could allow attackers to steal sensitive information like
              login credentials, credit card details, or confidential business
              data.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-100">
            <h4 className="text-2xl font-semibold mb-4">
              Key Features of MITM Attacks
            </h4>
            <ul className="list-disc list-inside space-y-4">
              <li>
                Users can <strong>create sessions</strong> and generate messages
                that are exchanged between the client and server.
              </li>
              <li>
                The system allows users to attempt to simulate MITM attacks by
                intercepting and modifying messages.
              </li>
              <li>
                MITM attempts are tracked, showing whether the attack was
                successful or blocked.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-lg mt-8 bg-gray-100">
            <h4 className="text-2xl font-semibold mb-4">
              Common Vulnerabilities
            </h4>
            <p className="text-lg mb-4">
              The following vulnerabilities can make systems susceptible to MITM
              attacks:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Unencrypted Communication:</strong> If messages are sent
                without encryption, attackers can easily intercept and read
                them.
              </li>
              <li>
                <strong>Weak Authentication:</strong> Systems that fail to
                properly verify both the sender and receiver are at higher risk.
              </li>
              <li>
                <strong>Public or Untrusted Networks:</strong> Open Wi-Fi
                networks allow attackers to inject themselves into the
                communication flow.
              </li>
              <li>
                <strong>Session Hijacking:</strong> Poor session management
                enables attackers to take control of active user sessions.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-lg mt-8 bg-white border border-gray-900">
            <h4 className="text-2xl font-semibold mb-6">
              Learn by Doing: MITM Attack Simulation
            </h4>
            <p className="text-lg mb-6 ">
              Ready to test your understanding? Use our interactive{" "}
              <strong>MITM Attack Simulation</strong> to experience how MITM
              attacks work, how to defend against them, and how encryption and
              authentication help prevent these types of attacks.
            </p>

            <button
              onClick={() => setInterceptEnabled(!interceptEnabled)}
              className={`px-4 py-2 rounded-lg ${
                interceptEnabled
                  ? 'bg-red-400 hover:bg-red-500'
                  : 'bg-green-400 hover:bg-green-500'
              }`}
            >
              {interceptEnabled ? 'Disable Interception' : 'Enable Interception'}
            </button>

            <div className="grid grid-cols-2 gap-6 mt-7">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">Message Stream</h3>
                  <button
                    onClick={generateMessage}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
                  >
                    Generate Message
                  </button>
                </div>
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-lg cursor-pointer ${
                        msg.isIntercepted
                          ? "bg-red-50 border border-red-800"
                          : "bg-white border border-gray-950"
                      }`}
                      onClick={() => setSelectedMessage(msg)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base text-gray-900">
                          {msg.sender} → {msg.recipient}
                        </span>
                        {msg.isModified && (
                          <AlertTriangle
                            className="text-yellow-500"
                            size={20}
                          />
                        )}
                      </div>
                      <p className="mt-2">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Message Inspector</h3>
                {selectedMessage ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-800 mb-1">
                        Message Content
                      </label>
                      <textarea
                        value={modifiedContent || selectedMessage.content}
                        onChange={(e) => setModifiedContent(e.target.value)}
                        className="w-full bg-gray-800 rounded-lg p-2 text-white"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => interceptMessage(selectedMessage.id)}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-lg"
                        disabled={selectedMessage.isIntercepted}
                      >
                        Intercept
                      </button>
                      <button
                        onClick={() =>
                          modifyMessage(selectedMessage.id, modifiedContent)
                        }
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
                        disabled={!selectedMessage.isIntercepted}
                      >
                        Modify
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">Select a message to inspect</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MITMSimulation;
