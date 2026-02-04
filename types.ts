
export enum ColorType {
  YELLOW = 'amarelo',
  RED = 'vermelho',
  BLUE = 'azul',
  GREEN = 'verde',
  ORANGE = 'laranja',
  PINK = 'rosa',
  PURPLE = 'roxo',
  WHITE = 'branco'
}

export interface DuckInfo {
  id: string;
  color: ColorType;
  hex: string;
}

export interface GameState {
  targetDuck: DuckInfo | null;
  ducks: DuckInfo[];
  score: number;
  status: 'idle' | 'playing' | 'feedback_correct' | 'feedback_incorrect';
}
