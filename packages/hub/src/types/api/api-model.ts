import type { ModelLibraryKey, TransformersInfo, WidgetType } from "@huggingface/tasks";
import type { License, PipelineType } from "../public";

export interface ApiModelInfo {
	_id: string;
	id: string;
	arxivIds: string[];
	author?: string;
	cardData?: ApiModelMetadata;
	cardError: unknown;
	cardExists?: true;
	config: unknown;
	contributors: Array<{ user: string; _id: string }>;
	disabled: boolean;
	discussionsDisabled: boolean;
	doi?: { id: string; commit: string };
	downloads: number;
	downloadsAllTime: number;
	files: string[];
	gitalyUid: string;
	inferenceProviderMapping?: ApiModelInferenceProviderMappingEntry[];
	lastAuthor: { email: string; user?: string };
	lastModified: string; // convert to date
	library_name?: ModelLibraryKey;
	likes: number;
	likesRecent: number;
	private: boolean;
	gated: false | "auto" | "manual";
	sha: string;
	spaces: string[];
	updatedAt: string; // convert to date
	createdAt: string; // convert to date
	pipeline_tag: PipelineType;
	tags: string[];
	"model-index": unknown;
	safetensors?: {
		parameters: Record<string, number>;
		total: number;
	};
	transformersInfo?: TransformersInfo;
}

export interface ApiModelIndex {
	name: string;
	results: {
		task: {
			/**
			 * Example: automatic-speech-recognition
Use task id from https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasksData.ts
			 */
			type: string;
			/**
			 * Example: Speech Recognition
			 */
			name?: string;
		};
		/**
		 * This will switch to required at some point.
in any case, we need them to link to PWC
		 */
		dataset?: {
			/**
			 * Example: common_voice. Use dataset id from https://hf.co/datasets
			 */
			type: string;
			/**
			 * A pretty name for the dataset. Example: Common Voice zh-CN
Also encode config params into the name if relevant.
			 */
			name: string;
			/**
			 * Optional. The name of the dataset configuration used in `load_dataset()`
			 */
			config?: string;
			/**
			 * Optional. Example: test
			 */
			split?: string;
			/**
			 * Optional. Example: 5503434ddd753f426f4b38109466949a1217c2bb
			 */
			revision?: string;
			args?:
				| string
				| {
						/**
						 * String Property
						 */
						[x: string]: string;
				  };
		};
		metrics: {
			/**
			 * Example: wer. Use metric id from https://hf.co/metrics
			 */
			type: string;
			/**
			 * Required. Example: 20.0 or "20.0 ± 1.2"
			 */
			value: unknown;
			/**
			 * Example: Test WER
			 */
			name?: string;
			/**
			 * Optional. The name of the metric configuration used in `load_metric()`.
			 */
			config?: string;
			args?:
				| string
				| {
						/**
						 * String Property
						 */
						[x: string]: string;
				  };
			/**
			 * [Automatically computed, do not set] Dynamically overridden by huggingface in API calls to indicate if it was verified by Hugging Face.
			 */
			verified?: boolean;
			/**
			 * Generated by Hugging Face to prove the results are valid. <add doc link>
			 */
			verifyToken?: string;
		}[];
		/**
		 * The source for this evaluation result.
		 */
		source?: {
			/**
			 * Example: Open LLM Leaderboard
			 */
			name?: string;
			/**
			 * Example: https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard
			 */
			url: string;
		};
	}[];
}

export interface ApiWidgetExampleFromModelcard {
	example_title?: string;
	group?: string;
	text?: string;
	src?: string;
	table?: {
		/**
		 * (string | number)[] Property
		 */
		[x: string]: (string | number)[];
	};
	structured_data?: {
		/**
		 * (string | number)[] Property
		 */
		[x: string]: (string | number)[];
	};
	candidate_labels?: string;
	messages?: {
		role: "system" | "user" | "assistant";
		content: string;
	}[];
	multi_class?: boolean;
	source_sentence?: string;
	sentences?: string[];
	parameters?: {
		aggregation_strategy?: string;
		top_k?: number;
		top_p?: number;
		temperature?: number;
		max_new_tokens?: number;
		do_sample?: boolean;
		negative_prompt?: string;
		guidance_scale?: number;
		num_inference_steps?: number;
	};
	output?:
		| {
				label: string;
				score: number;
		  }[]
		| {
				answer: string;
				score: number;
		  }
		| {
				text: string;
		  }
		| {
				url: string;
		  };
}

export interface ApiModelMetadata {
	datasets?: string | string[];
	license?: License | License[];
	license_name?: string;
	license_link?: "LICENSE" | "LICENSE.md" | string;
	license_details?: string;
	inference?:
		| boolean
		| {
				parameters?: {
					aggregation_strategy?: string;
					top_k?: number;
					top_p?: number;
					temperature?: number;
					max_new_tokens?: number;
					do_sample?: boolean;
					negative_prompt?: string;
					guidance_scale?: number;
					num_inference_steps?: number;
				};
		  };
	language?: string | string[];
	language_bcp47?: string[];
	language_details?: string;
	tags?: string[];
	pipeline_tag?: string;
	co2_eq_emissions?:
		| number
		| {
				/**
				 * Emissions in grams of CO2
				 */
				emissions: number;
				/**
				 * source of the information, either directly from AutoTrain, code carbon or from a scientific article documenting the model
				 */
				source?: string;
				/**
				 * pre-training or fine-tuning
				 */
				training_type?: string;
				/**
				 * as granular as possible, for instance Quebec, Canada or Brooklyn, NY, USA
				 */
				geographical_location?: string;
				/**
				 * how much compute and what kind, e.g. 8 v100 GPUs
				 */
				hardware_used?: string;
		  };
	library_name?: string;
	thumbnail?: string | null;
	description?: string | null;
	mask_token?: string;
	widget?: ApiWidgetExampleFromModelcard[];
	"model-index"?: ApiModelIndex[];
	finetuned_from?: string;
	base_model?: string | string[];
	instance_prompt?: string | null;
	extra_gated_prompt?: string;
	extra_gated_fields?: {
		/**
		 * "text" | "checkbox" | "date_picker" | "country" | "ip_location" | { type: "text" | "checkbox" | "date_picker" | "country" | "ip_location" } | { type: "select", options: Array<string | { label: string; value: string; }> } Property
		 */
		[x: string]:
			| "text"
			| "checkbox"
			| "date_picker"
			| "country"
			| "ip_location"
			| { type: "text" | "checkbox" | "date_picker" | "country" | "ip_location" }
			| { type: "select"; options: Array<string | { label: string; value: string }> };
	};
	extra_gated_heading?: string;
	extra_gated_description?: string;
	extra_gated_button_content?: string;
}

export interface ApiModelInferenceProviderMappingEntry {
	provider: string; // Provider name
	hfModelId: string; // ID of the model on the Hugging Face Hub
	providerId: string; // ID of the model on the provider's side
	status: "live" | "staging";
	task: WidgetType;
	adapter?: string;
	adapterWeightsPath?: string;
	type?: "single-file" | "tag-filter";
}
