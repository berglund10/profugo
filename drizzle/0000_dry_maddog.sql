CREATE TABLE "registration" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "registration_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar,
	"personalNumber" integer NOT NULL,
	"city" varchar
);
