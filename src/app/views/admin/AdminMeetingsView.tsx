"use client";

import { useEffect, useState } from "react";

import { getMeetings, cancelMeeting } from "@/services/meetings.service";

type Meeting = {
  id: string;
  date: string;
  time: string;
  status: string;
  link: string;
  user?: {
    name?: string;
    email?: string;
    companyName?: string;
  };
};

export default function AdminMeetingsView() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const data = await getMeetings(token);

      setMeetings(data);
    } catch (error) {
      console.error("Error obteniendo reuniones", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      await cancelMeeting(id, token);

      fetchMeetings();
    } catch (error) {
      console.error("Error cancelando reunión", error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-400">
        Cargando reuniones...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-semibold text-white">
          Reuniones
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Gestión administrativa de reuniones corporativas.
        </p>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-gray-400">
          No hay reuniones registradas.
        </div>
      ) : (
        <div className="grid gap-4">

          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div className="space-y-2">

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      Estado:
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        meeting.status === "Pendiente"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : meeting.status === "Cancelada"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {meeting.status}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-white">
                    {meeting.user?.companyName || "Empresa"}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {meeting.user?.email}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2 text-sm text-gray-300">
                    <span>
                      📅 {meeting.date}
                    </span>

                    <span>
                      🕒 {meeting.time}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">

                  <a
                    href={meeting.link}
                    target="_blank"
                    className="rounded-lg border border-[#C7962D]/30 px-4 py-2 text-sm text-[#C7962D] transition hover:bg-[#C7962D]/10"
                  >
                    Entrar
                  </a>

                  {meeting.status !== "Cancelada" && (
                    <button
                      onClick={() => handleCancel(meeting.id)}
                      className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      Cancelar
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}