import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExerciseInfo } from "../services/ExerciseService";

const SECS_PER_QUESTION = 30;

interface Choice {
  option_text: string;
  is_correct: boolean;
}

interface Question {
  question_text: string;
  choices: Choice[];
  correct_explanation: string;
  related_lecture: string;
  points: number;
}

type Status = "loading" | "error" | "ready" | "active" | "finished";

interface State {
  questions: Question[];
  status: Status;
  index: number;
  answer: Choice | null;
  points: number;
  secondsRemaining: number | null;
}

type Action =
  | { type: "dataQuizReceived"; payload: Question[] }
  | { type: "dataQuizFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: Choice }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataQuizReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataQuizFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      // const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload.is_correct === true ? state.points + 1 : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: state.secondsRemaining === 1 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action type");
  }
}

interface QuizContextType extends State {
  numQuestions: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<Action>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { exerciseId } = useParams();
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.length;

  useEffect(() => {
    console.log("id ex  ", exerciseId);
    const fetchData = async () => {
      if (exerciseId) {
        await getExerciseInfo(exerciseId).then((data) => {
          if (data.status <= 305) {
            dispatch({
              type: "dataQuizReceived",
              payload: data.data.questions,
            });
          }
          console.log("hello", data.data.questions);
        });
      }
    };
    fetchData();
  }, [exerciseId]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

function useQuiz(): QuizContextType {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
