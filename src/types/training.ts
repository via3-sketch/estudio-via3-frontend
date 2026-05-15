export interface FileResource {
  id: string;

  title: string;

  fileUrl: string;

  fileType: string;
}

export interface TrainingCard {
  id: string;

  title: string;

  shortDescription: string;

  fileResource: FileResource;
}

export interface TrainingDetail {
  id: string;

  title: string;

  shortDescription: string;

  description: string;

  tagline: string;

  category: string;

  includes: string[];

  fileResource: FileResource;
}