import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "constants/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ScanHire" },
    {
      name: "description",
      content:
        "Scanhire is an AI-powered resume analyzer that helps" +
        " job seekers optimize their resumes for Applicant Tracking Systems (ATS)!",
    },
  ];
}

export default function Home() {
 const { auth } = usePuterStore();
 const navigate = useNavigate();

   useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-18">
          <h1>Track Your Applications & Resume Rating</h1>
          <h2>
            Upload your resumes and check AI-powered reviews and feedbacks
          </h2>
        </div>
      {resumes.length > 0 &&  (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
      </section>
    </main>
  );
}
