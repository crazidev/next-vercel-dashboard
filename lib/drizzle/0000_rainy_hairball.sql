-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `admin` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`info` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `investments` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_id` int(11) NOT NULL,
	`amount` float NOT NULL,
	`profit` float NOT NULL,
	`status` enum('active','completed','error','') NOT NULL,
	`plan_id` int(11) NOT NULL,
	`date` text NOT NULL,
	`counting_profit` int(11) NOT NULL,
	`due_date` text DEFAULT 'NULL',
	`user_funded` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment_method` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`icon` text NOT NULL,
	`details` text NOT NULL,
	`network` text DEFAULT 'NULL',
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `plans` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`min` int(11) NOT NULL,
	`max` int(11) DEFAULT 'NULL',
	`profit_percentage` int(11) NOT NULL,
	`duration` text NOT NULL,
	`type` varchar(20) DEFAULT 'NULL',
	`json_info` text DEFAULT 'NULL',
	`banner` text DEFAULT 'NULL',
	`icon` text DEFAULT 'NULL',
	`symbol` text DEFAULT 'NULL',
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `sequelizemeta` (
	`name` varchar(255) NOT NULL,
	CONSTRAINT `name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`type` enum('deposit','withdrawal','bonus','') NOT NULL,
	`amount` float NOT NULL DEFAULT 0,
	`user_id` int(11) NOT NULL,
	`status` enum('pending','confirmed','error','') DEFAULT 'NULL',
	`withdraw_addr` text DEFAULT 'NULL',
	`date` text NOT NULL,
	`payment_method_id` int(11) NOT NULL,
	`payment_slip` text DEFAULT 'NULL',
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`fullname` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`gender` text NOT NULL,
	`phone` text NOT NULL,
	`country` text NOT NULL,
	`reg_date` text NOT NULL,
	`status` enum('pending_verification','verified','blocked','awaiting_verification') DEFAULT ''pending_verification'',
	`balance` float DEFAULT 0,
	`profile_image` text DEFAULT 'NULL',
	`id_card` text DEFAULT 'NULL',
	`currency` enum('$','£','R','') DEFAULT ''R'',
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `investments` ADD CONSTRAINT `investments_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `investments` ADD CONSTRAINT `investments_ibfk_4` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_ibfk_4` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method`(`id`) ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id`) REFERENCES `transactions`(`user_id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`id`) REFERENCES `investments`(`user_id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
CREATE INDEX `user_id` ON `investments` (`user_id`);--> statement-breakpoint
CREATE INDEX `plan_id` ON `investments` (`plan_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `transactions` (`user_id`);--> statement-breakpoint
CREATE INDEX `payment_method_id` ON `transactions` (`payment_method_id`);
*/