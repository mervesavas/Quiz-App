interface Question {
  id: number;
  title: string;
  body: string;
}

interface Answer {
  id: number;
  body: string;
}
  
export interface QuestionsProps {
  data: Question[];
}
  
export interface AnswerSheetType {
  [key: number]: string | undefined;
}
  
export interface Props {
  answers: { [key: number]: string | undefined };
  data: Answer[];
}

export interface TimerProps {
  initialCount: number;
  onTimeout: () => void;
}

export interface FinishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}