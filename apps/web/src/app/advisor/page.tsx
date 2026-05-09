import { AdvisorForm } from "../../components/AdvisorForm";

export default function AdvisorPage() {
  return (
    <div className="page">
      <p className="eyebrow">Stack Advisor</p>
      <h1>Tell us what you are building.</h1>
      <p className="lead">Get a deterministic MVP stack recommendation, avoid-list, and learning path.</p>
      <AdvisorForm />
    </div>
  );
}
