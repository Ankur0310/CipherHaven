import React, { useState } from "react";
import { Clock, RefreshCw } from "lucide-react";
import { Message, Session } from "@/types";

const ReplayAttackSimulation = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replayAttempts, setReplayAttempts] = useState<
    { messageId: string; success: boolean; timestamp: number }[]
  >([]);

  const generateSession = () => {
    const session: Session = {
      id: Math.random().toString(36).substring(2, 9),
      key: Math.random().toString(36).substring(2, 16),
      timestamp: Date.now(),
      isExpired: false,
    };
    setSessions((prev) => [...prev, session]);
    return session;
  };

  const generateMessage = () => {
    const session = sessions[sessions.length - 1] || generateSession();
    const message: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: "Client",
      recipient: "Server",
      content: "AUTH_REQUEST",
      timestamp: Date.now(),
      sessionKey: session.key,
    };
    setMessages((prev) => [...prev, message]);
  };

  const attemptReplay = (message: Message) => {
    const session = sessions.find((s) => s.key === message.sessionKey);
    const success = session ? !session.isExpired : false;

    setReplayAttempts((prev) => [
      ...prev,
      { messageId: message.id, success, timestamp: Date.now() },
    ]);
  };

  const expireSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, isExpired: true } : session
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <RefreshCw className="text-yellow-500" />
          Replay Attack Simulation
        </h2>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-medium mb-4 ">
          Learning Resources: Replay Attacks
        </h3>

        <div className="space-y-12">
          <div className="text-lg ">
            <p className="mb-6">
              A <strong>Replay Attack</strong> occurs when an attacker
              intercepts a valid transmission of data and sends it again
              (replays it) with malicious intent. This can cause harm as the
              attacker tries to fraudulently use previously authenticated data,
              tricking the system into thinking it's legitimate.
            </p>

            <p className="mb-6">
              Think of it like someone eavesdropping on a conversation and then
              pretending to be you by repeating things you said earlier. In the
              world of cybersecurity, this could mean an attacker replaying old
              bank transactions to steal money or reusing authentication data to
              gain unauthorized access.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-100">
            <h4 className="text-2xl font-semibold mb-4 ">
              Key Features of Replay Attacks
            </h4>
            <ul className="list-disc list-inside space-y-4 ">
              <li>
                Users can <strong>create sessions</strong> and generate messages
                that are authenticated, ensuring data integrity.
              </li>
              <li>
                The system allows users to attempt to replay old messages to
                test if session security is robust.
              </li>
              <li>
                Replay attempts are tracked, and users can see whether the
                attack was successful or blocked.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-lg mt-8 bg-gray-100">
            <h4 className="text-2xl font-semibold mb-4 ">
              Common Vulnerabilities
            </h4>
            <p className="text-lg mb-4 ">
              The following vulnerabilities can make systems susceptible to
              replay attacks:
            </p>
            <ul className="list-disc list-inside space-y-3 ">
              <li>
                <strong>Missing or Weak Session Management:</strong> Failure to
                properly track or limit session lifetimes makes it easier for
                attackers to reuse old messages.
              </li>
              <li>
                <strong>Lack of Timestamp Validation:</strong> If messages don’t
                include timestamps, attackers can resend old messages without
                detection.
              </li>
              <li>
                <strong>No Nonces (One-time Tokens):</strong> Nonces ensure that
                each message is unique and can’t be used more than once.
              </li>
              <li>
                <strong>Inadequate Session Expiration:</strong> Sessions that
                don’t automatically expire create an opportunity for attackers
                to reuse valid data after a period of time.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-lg mt-8 bg-white border border-gray-900">
            <h4 className="text-2xl font-semibold mb-6 ">
              Learn by Doing: Replay Attack Simulation
            </h4>
            <p className="text-lg mb-6 ">
              Ready to test your understanding? Use our interactive{" "}
              <strong>Replay Attack Simulation</strong> to experience how replay
              attacks work, how to defend against them, and how session
              expiration helps prevent these types of attacks.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => generateSession()}
                className="px-4 py-2 bg-green-500 hover:bg-green-500 rounded-lg"
              >
                New Session
              </button>
              <button
                onClick={generateMessage}
                className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg"
              >
                Generate Message
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-4">Active Sessions</h3>
              <div className="space-y-2">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg ${
                      session.isExpired ? "bg-red-200 border border-red-800" : "bg-green-200 border border-green-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">
                        Session: {session.id}
                      </span>
                      <button
                        onClick={() => expireSession(session.id)}
                        className="text-sm text-gray-800 hover:text-red-600"
                        disabled={session.isExpired}
                      >
                        {session.isExpired ? "Expired" : "Expire"}
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <div>Key: {session.key}</div>
                      <div>
                        Created: {new Date(session.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Messages</h3>
              <div className="space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="p-4 bg-blue-100 rounded-lg cursor-pointer"
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {message.sender} → {message.recipient}
                      </span>
                      <Clock size={16} className="text-gray-900" />
                    </div>
                    <div className="mt-2">
                      <div className="font-mono text-sm">{message.content}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Session Key: {message.sessionKey}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedMessage && (
            <div className="bg-gray-200 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Replay Attack Simulation</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2">Selected Message</h4>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <pre className="text-sm">
                        {JSON.stringify(selectedMessage, null, 2)}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Replay Attempts</h4>
                    <div className="space-y-2">
                      {replayAttempts
                        .filter(
                          (attempt) => attempt.messageId === selectedMessage.id
                        )
                        .map((attempt, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded-lg ${
                              attempt.success ? "bg-green-50" : "bg-red-50"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {attempt.success ? (
                                <span className="text-green-500">Success</span>
                              ) : (
                                <span className="text-red-500">Failed</span>
                              )}
                              <span className="text-sm text-gray-800">
                                {new Date(attempt.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => attemptReplay(selectedMessage)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                >
                  Attempt Replay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplayAttackSimulation;
