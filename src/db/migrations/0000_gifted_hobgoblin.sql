CREATE TABLE `birth_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year_month` text NOT NULL,
	`district` text NOT NULL,
	`dong` text NOT NULL,
	`birth_count` integer NOT NULL,
	`death_count` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `counseling_centers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`district` text,
	`address` text,
	`phone` text NOT NULL,
	`is_24h` integer DEFAULT false,
	`operating_hours` text,
	`lat` real,
	`lng` real,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `maternal_health_programs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`district` text NOT NULL,
	`program_type` text NOT NULL,
	`program_name` text NOT NULL,
	`description` text,
	`week_range_start` integer,
	`week_range_end` integer,
	`year` integer,
	`recipient_count` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `postpartum_centers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`external_id` text,
	`name` text NOT NULL,
	`district` text NOT NULL,
	`road_address` text,
	`jibun_address` text,
	`phone` text,
	`capacity_mother` integer,
	`capacity_newborn` integer,
	`business_status` text,
	`permit_date` text,
	`close_date` text,
	`lat` real,
	`lng` real,
	`price_min` integer,
	`price_max` integer,
	`amenities` text,
	`rating` real,
	`review_count` integer DEFAULT 0,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `postpartum_centers_external_id_unique` ON `postpartum_centers` (`external_id`);--> statement-breakpoint
CREATE TABLE `pregnancy_duration_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year` integer NOT NULL,
	`week_range` text NOT NULL,
	`count` integer NOT NULL,
	`risk_level` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `support_policies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`external_id` text,
	`title` text NOT NULL,
	`organization` text,
	`category` text,
	`description` text,
	`eligibility` text,
	`benefit_amount` text,
	`application_method` text,
	`application_url` text,
	`district` text,
	`applicable_week_start` integer,
	`applicable_week_end` integer,
	`embedding` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `support_policies_external_id_unique` ON `support_policies` (`external_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text,
	`nickname` text,
	`district` text,
	`due_date` text,
	`is_postpartum` integer DEFAULT false,
	`birth_date` text,
	`child_count` integer DEFAULT 0,
	`income` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `voice_diaries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`recorded_at` text DEFAULT CURRENT_TIMESTAMP,
	`audio_url` text,
	`transcript` text,
	`phq1` integer,
	`phq2` integer,
	`phq3` integer,
	`phq4` integer,
	`phq5` integer,
	`phq6` integer,
	`phq7` integer,
	`phq8` integer,
	`phq9` integer,
	`total_score` integer,
	`risk_level` text,
	`emotion` text,
	`triggers` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `women_emergency_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year_month` text NOT NULL,
	`consult_type` text NOT NULL,
	`count` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
