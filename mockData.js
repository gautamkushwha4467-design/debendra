import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingQuestions } from '../data/mockData.js';
import { AuthContext } from '../context/AuthContext.jsx';
import { fetchJson } from '../lib/api.js';

const interests = ['Coding', 'Design', 'Business', 'Teaching'];
const skills = ['Python', 'Communication', 'Problem Solving'];
const educationLevels = ['University', 'Bootcamp', 'Self-taught'];

export default function OnboardingStepper() {
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [education, setEducation] = useState(educationLevels[0]);
  const [picked, setPicked] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleInterest = (value) => {
    setPicked((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const toggleSkill = (value) => {
    setSelectedSkills((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleGenerate = async () => {
    if (!authenticated) {
      setError('Please login to save your onboarding data.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await fetchJson('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ education, interests: picked, skills: selectedSkills })
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Step {step}/5</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Onboarding</h2>
        </div>
        <div className="h-2 w-48 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all" style={{ width: `${(step / 5) * 100}%` }} />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <label className="grid gap-2 text-sm text-slate-700">
            Education
            <select value={education} onChange={(e) => setEducation(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
              {educationLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <p className="text-slate-700">Select the areas you enjoy most.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {interests.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleInterest(item)}
                className={`rounded-3xl border px-5 py-4 text-left transition ${picked.includes(item) ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <p className="text-slate-700">Pick your strongest skills.</p>
          <div className="flex flex-wrap gap-3">
            {skills.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleSkill(item)}
                className={`rounded-full border px-4 py-2 text-sm transition ${selectedSkills.includes(item) ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 bg-slate-100 text-slate-700 hover:border-purple-300'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          {onboardingQuestions.map((item, index) => (
            <div key={item.question} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-medium text-slate-900">{index + 1}. {item.question}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {item.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [item.question]: option })}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${answers[item.question] === option ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-indigo-50 p-6 text-slate-900">
          <h3 className="text-2xl font-semibold">All set!</h3>
          <p>Save your onboarding answers and generate a personalized career path.</p>
          <button
            type="button"
            disabled={loading}
            onClick={handleGenerate}
            className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Generate My Career Path 🚀'}
          </button>
        </div>
      )}

      {error && <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          disabled={step === 1}
          onClick={() => setStep((value) => Math.max(value - 1, 1))}
          className="rounded-3xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep((value) => Math.min(value + 1, 5))}
          className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01]"
        >
          {step === 4 ? 'Continue' : 'Next Step'}
        </button>
      </div>
    </div>
  );
}
