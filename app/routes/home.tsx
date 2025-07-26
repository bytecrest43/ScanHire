import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import BannerAd from "~/components/BannerAd";
import ResponsiveAd from "~/components/ResponsiveAd";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import { ADSENSE_PUBLISHER_ID, AD_UNITS } from "../../constants/ads";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ScanHire" },
    { name: "description", content: "Get AI-powered feedback on your resume!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    
    {/* Banner ad below navbar */}
    <BannerAd 
      client={ADSENSE_PUBLISHER_ID}
      slot={AD_UNITS.BANNER.HOME}
    />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ): (
          <h2>Review your submissions and check AI-powered feedback.</h2>
        )}
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" alt="Loading..." className="w-[200px]" />
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
      
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <Link to="/wipe" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition w-fit text-xl">
          Delete All Data
        </Link>
      </div>
    </section>
    
    {/* Responsive ad at the bottom of the page */}
    <div className="mx-auto max-w-[1200px] px-4 pb-8">
      <ResponsiveAd 
        client={ADSENSE_PUBLISHER_ID}
        slot={AD_UNITS.RESPONSIVE.HOME}
      />
    </div>
  </main>
}