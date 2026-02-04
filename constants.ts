
import { ColorType, DuckInfo } from './types';

export const COLORS_CONFIG: Record<ColorType, string> = {
  [ColorType.YELLOW]: '#FCD34D',
  [ColorType.RED]: '#EF4444',
  [ColorType.BLUE]: '#3B82F6',
  [ColorType.GREEN]: '#10B981',
  [ColorType.ORANGE]: '#F59E0B',
  [ColorType.PINK]: '#EC4899',
  [ColorType.PURPLE]: '#8B5CF6',
  [ColorType.WHITE]: '#FFFFFF'
};

export const ALL_COLORS = Object.values(ColorType);

export const generateDucks = (count: number): DuckInfo[] => {
  const shuffled = [...ALL_COLORS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((color, index) => ({
    id: `duck-${index}-${Date.now()}`,
    color,
    hex: COLORS_CONFIG[color]
  }));
};
