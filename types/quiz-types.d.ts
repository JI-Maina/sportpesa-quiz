export interface Answer {
  uid: string;
  answer: string;
  is_answer: boolean;
}

export interface Question {
  uid: string;
  quiz_type: string;
  question: string;
  image: null | string;
  points: number;
  timer: number;
  answers: Answer[];
}

export interface QuizSet {
  uid: string;
  category_name: string;
  description: string;
  quiz_type: string;
  theme_image: string;
  start_datetime: string;
  end_datetime: string;
  status: string;
  is_payable: string;
  amount_payable: string;
  prize_won: string;
  questions: Question[];
}
