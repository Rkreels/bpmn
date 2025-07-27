import { useDataManager } from './useDataManager';

export interface Touchpoint {
  id: string;
  name: string;
  description: string;
  type: 'digital' | 'physical' | 'human';
  channel: string;
  satisfaction: number;
  effort: number;
  frequency: number;
  emotion: 'very-negative' | 'negative' | 'neutral' | 'positive' | 'very-positive';
  duration: string;
  painPoints: string[];
  opportunities: string[];
}

export interface JourneyStage {
  id: string;
  name: string;
  description: string;
  touchpoints: Touchpoint[];
  emotions: string[];
  goals: string[];
  painPoints: string[];
  actions: string[];
}

export interface CustomerJourney {
  id: string;
  name: string;
  description: string;
  persona: string;
  stages: JourneyStage[];
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

const initialJourneys: CustomerJourney[] = [
  {
    id: 'journey_1',
    name: 'Customer Onboarding Journey',
    description: 'Complete customer onboarding experience from first contact to activation',
    persona: 'New Customer',
    stages: [
      {
        id: 'stage_1',
        name: 'Awareness',
        description: 'Customer becomes aware of our product',
        touchpoints: [
          {
            id: 'tp_1',
            name: 'Website Visit',
            description: 'First visit to company website',
            type: 'digital',
            channel: 'Website',
            satisfaction: 7,
            effort: 3,
            frequency: 85,
            emotion: 'positive',
            duration: '5 minutes',
            painPoints: ['Slow loading', 'Complex navigation'],
            opportunities: ['Improve page speed', 'Simplify menu structure']
          }
        ],
        emotions: ['curious', 'interested'],
        goals: ['Learn about product', 'Understand value proposition'],
        painPoints: ['Information overload', 'Unclear pricing'],
        actions: ['Browse website', 'Read content', 'Download resources']
      }
    ],
    status: 'active',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
    createdBy: 'UX Team'
  }
];

const validateJourney = (item: Partial<CustomerJourney>): string | null => {
  if (!item.name?.trim()) return 'Journey name is required';
  if (!item.persona?.trim()) return 'Persona is required';
  return null;
};

export const useJourneyData = () => {
  const journeyManager = useDataManager<CustomerJourney>({
    storageKey: 'customer_journeys',
    initialData: initialJourneys,
    validator: validateJourney
  });

  const addStageToJourney = (journeyId: string, stage: Omit<JourneyStage, 'id'>) => {
    const journey = journeyManager.getById(journeyId);
    if (!journey) return false;

    const newStage: JourneyStage = {
      ...stage,
      id: `stage_${Date.now()}`
    };

    const updatedStages = [...journey.stages, newStage];
    return journeyManager.update(journeyId, { stages: updatedStages });
  };

  const addTouchpointToStage = (journeyId: string, stageId: string, touchpoint: Omit<Touchpoint, 'id'>) => {
    const journey = journeyManager.getById(journeyId);
    if (!journey) return false;

    const newTouchpoint: Touchpoint = {
      ...touchpoint,
      id: `tp_${Date.now()}`
    };

    const updatedStages = journey.stages.map(stage =>
      stage.id === stageId
        ? { ...stage, touchpoints: [...stage.touchpoints, newTouchpoint] }
        : stage
    );

    return journeyManager.update(journeyId, { stages: updatedStages });
  };

  const updateStage = (journeyId: string, stageId: string, updates: Partial<JourneyStage>) => {
    const journey = journeyManager.getById(journeyId);
    if (!journey) return false;

    const updatedStages = journey.stages.map(stage =>
      stage.id === stageId ? { ...stage, ...updates } : stage
    );

    return journeyManager.update(journeyId, { stages: updatedStages });
  };

  const updateTouchpoint = (journeyId: string, stageId: string, touchpointId: string, updates: Partial<Touchpoint>) => {
    const journey = journeyManager.getById(journeyId);
    if (!journey) return false;

    const updatedStages = journey.stages.map(stage =>
      stage.id === stageId
        ? {
            ...stage,
            touchpoints: stage.touchpoints.map(tp =>
              tp.id === touchpointId ? { ...tp, ...updates } : tp
            )
          }
        : stage
    );

    return journeyManager.update(journeyId, { stages: updatedStages });
  };

  const deleteTouchpoint = (journeyId: string, stageId: string, touchpointId: string) => {
    const journey = journeyManager.getById(journeyId);
    if (!journey) return false;

    const updatedStages = journey.stages.map(stage =>
      stage.id === stageId
        ? {
            ...stage,
            touchpoints: stage.touchpoints.filter(tp => tp.id !== touchpointId)
          }
        : stage
    );

    return journeyManager.update(journeyId, { stages: updatedStages });
  };

  const deleteStage = (journeyId: string, stageId: string) => {
    const journey = journeyManager.getById(journeyId);
    if (!journey) return false;

    const updatedStages = journey.stages.filter(stage => stage.id !== stageId);
    return journeyManager.update(journeyId, { stages: updatedStages });
  };

  return {
    ...journeyManager,
    addStageToJourney,
    addTouchpointToStage,
    updateStage,
    updateTouchpoint,
    deleteTouchpoint,
    deleteStage
  };
};