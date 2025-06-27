import React, { useState } from 'react';
import { GraduationCap, BookOpen, Calculator, FlaskConical, Settings, FileText, Upload, Users, ArrowLeft } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  selected: boolean;
}

interface QuestionType {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

function App() {
  const [currentStep, setCurrentStep] = useState<'subjects' | 'questions' | 'generate'>('subjects');
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 'math', name: 'Mathematics', icon: Calculator, color: 'bg-blue-500', selected: false },
    { id: 'english', name: 'English', icon: BookOpen, color: 'bg-green-500', selected: false },
    { id: 'science', name: 'Science', icon: FlaskConical, color: 'bg-purple-500', selected: false }
  ]);

  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([
    { id: 'essay', name: 'Essay', description: 'Open-ended written responses', selected: false },
    { id: 'multiple-choice', name: 'Multiple Choice', description: 'Select from provided options', selected: false },
    { id: 'identification', name: 'Identification', description: 'Fill in the blank or short answer', selected: false },
    { id: 'true-false', name: 'Modified True/False', description: 'True/False with justification', selected: false },
    { id: 'enumeration', name: 'Enumeration', description: 'List multiple items or points', selected: false }
  ]);

  const [examSettings, setExamSettings] = useState({
    totalQuestions: 20,
    difficulty: 'medium',
    uploadedFile: null as File | null
  });

  const toggleSubject = (id: string) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === id ? { ...subject, selected: !subject.selected } : subject
    ));
  };

  const toggleQuestionType = (id: string) => {
    setQuestionTypes(prev => prev.map(type => 
      type.id === id ? { ...type, selected: !type.selected } : type
    ));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setExamSettings(prev => ({ ...prev, uploadedFile: file }));
    }
  };

  const getSelectedSubjects = () => subjects.filter(s => s.selected);
  const getSelectedQuestionTypes = () => questionTypes.filter(q => q.selected);

  const canProceed = () => {
    if (currentStep === 'subjects') return getSelectedSubjects().length > 0;
    if (currentStep === 'questions') return getSelectedQuestionTypes().length > 0;
    return true;
  };

  const goBack = () => {
    if (currentStep === 'questions') setCurrentStep('subjects');
    if (currentStep === 'generate') setCurrentStep('questions');
  };

  const generateExam = () => {
    const selectedSubjects = getSelectedSubjects();
    const selectedTypes = getSelectedQuestionTypes();
    
    alert(`Exam Generated!\n\nSubjects: ${selectedSubjects.map(s => s.name).join(', ')}\nQuestion Types: ${selectedTypes.map(q => q.name).join(', ')}\nTotal Questions: ${examSettings.totalQuestions}\nUploaded File: ${examSettings.uploadedFile?.name || 'None'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SmartBankEDU</h1>
                <p className="text-sm text-gray-600">Intelligent Exam Generator</p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                currentStep === 'subjects' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>Subjects</span>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                currentStep === 'questions' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>Questions</span>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                currentStep === 'generate' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>Generate</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        {currentStep !== 'subjects' && (
          <div className="mb-6">
            <button
              onClick={goBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>
        )}

        {/* Subject Selection */}
        {currentStep === 'subjects' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Subjects</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the subjects you want to include in your exam. You can choose multiple subjects to create a comprehensive assessment.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {subjects.map((subject) => {
                const IconComponent = subject.icon;
                return (
                  <div
                    key={subject.id}
                    onClick={() => toggleSubject(subject.id)}
                    className={`relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 transform hover:scale-105 ${
                      subject.selected ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="p-8 text-center">
                      <div className={`${subject.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        subject.selected ? 'ring-4 ring-blue-200' : ''
                      }`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className={`text-xl font-semibold mb-2 ${
                        subject.selected ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {subject.name}
                      </h3>
                      {subject.selected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {getSelectedSubjects().length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Selected Subjects:</h4>
                <div className="flex flex-wrap gap-2">
                  {getSelectedSubjects().map(subject => (
                    <span key={subject.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {subject.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Question Type Selection */}
        {currentStep === 'questions' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Question Types</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the types of questions you want to include in your exam. Different question types test different skills and knowledge areas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questionTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => toggleQuestionType(type.id)}
                  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
                    type.selected ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                      {type.selected ? (
                        <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-400 rounded flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {getSelectedQuestionTypes().length > 0 && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Selected Question Types:</h4>
                <div className="flex flex-wrap gap-2">
                  {getSelectedQuestionTypes().map(type => (
                    <span key={type.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Exam Generation */}
        {currentStep === 'generate' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Generate Your Exam</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Review your selections and customize your exam settings before generating.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Exam Preview */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Exam Preview
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Selected Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedSubjects().map(subject => (
                        <span key={subject.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {subject.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Question Types:</h4>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedQuestionTypes().map(type => (
                        <span key={type.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {type.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {examSettings.uploadedFile && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Uploaded File:</h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">{examSettings.uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(examSettings.uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Exam Settings */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Exam Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Upload className="h-4 w-4 inline mr-1" />
                      Upload Reference File
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.txt,.rtf"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: PDF, DOC, DOCX, TXT, RTF
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="h-4 w-4 inline mr-1" />
                      Total Questions
                    </label>
                    <input
                      type="number"
                      value={examSettings.totalQuestions}
                      onChange={(e) => setExamSettings(prev => ({ ...prev, totalQuestions: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="5"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                    <select
                      value={examSettings.difficulty}
                      onChange={(e) => setExamSettings(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generateExam}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FileText className="h-5 w-5 inline mr-2" />
                Generate Exam
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => {
              if (currentStep === 'questions') setCurrentStep('subjects');
              if (currentStep === 'generate') setCurrentStep('questions');
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 'subjects' 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
            disabled={currentStep === 'subjects'}
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-500">
            Step {currentStep === 'subjects' ? '1' : currentStep === 'questions' ? '2' : '3'} of 3
          </div>

          <button
            onClick={() => {
              if (currentStep === 'subjects') setCurrentStep('questions');
              if (currentStep === 'questions') setCurrentStep('generate');
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !canProceed() || currentStep === 'generate'
                ? 'text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={!canProceed() || currentStep === 'generate'}
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;