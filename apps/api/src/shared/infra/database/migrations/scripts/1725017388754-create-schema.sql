-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.2
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: "crud-database" | type: DATABASE --
-- DROP DATABASE IF EXISTS "crud-database";
-- CREATE DATABASE "crud-database";
-- ddl-end --


-- object: public.template | type: TABLE --
-- DROP TABLE IF EXISTS public.template CASCADE;
CREATE TABLE public.template (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__template PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.template.id IS E'The database unique identifier.';
-- ddl-end --
COMMENT ON COLUMN public.template.alternative_id IS E'The numeric identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.template.created_at IS E'The data of register creation.';
-- ddl-end --
COMMENT ON COLUMN public.template.updated_at IS E'The data of register update.';
-- ddl-end --
COMMENT ON COLUMN public.template.deleted_at IS E'The field to handle soft deletes.';
-- ddl-end --
ALTER TABLE public.template OWNER TO postgres;
-- ddl-end --

-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	email varchar(100) NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	password_hash varchar(256) NOT NULL,
	phone_number varchar(30),
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__users PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.users.id IS E'The database unique identifier.';
-- ddl-end --
COMMENT ON COLUMN public.users.alternative_id IS E'The numeric identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.users.email IS E'The user email.';
-- ddl-end --
COMMENT ON COLUMN public.users.first_name IS E'The user firstname.';
-- ddl-end --
COMMENT ON COLUMN public.users.last_name IS E'The user lastname.';
-- ddl-end --
COMMENT ON COLUMN public.users.password_hash IS E'The user password hash.';
-- ddl-end --
COMMENT ON COLUMN public.users.phone_number IS E'The user mobile phone number.';
-- ddl-end --
COMMENT ON COLUMN public.users.created_at IS E'The data of register creation.';
-- ddl-end --
COMMENT ON COLUMN public.users.updated_at IS E'The data of register update.';
-- ddl-end --
COMMENT ON COLUMN public.users.deleted_at IS E'The field to handle soft deletes.';
-- ddl-end --
ALTER TABLE public.users OWNER TO postgres;
-- ddl-end --

-- object: idx__part__uq__user_email | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__user_email CASCADE;
CREATE UNIQUE INDEX idx__part__uq__user_email ON public.users
USING btree
(
	email,
	deleted_at ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__uq__user_email | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__user_email CASCADE;
CREATE UNIQUE INDEX idx__uq__user_email ON public.users
USING btree
(
	email
)
WHERE (deleted_at is null);
-- ddl-end --

-- object: public.notification_types | type: TABLE --
-- DROP TABLE IF EXISTS public.notification_types CASCADE;
CREATE TABLE public.notification_types (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	slug varchar(100) NOT NULL,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__notification_types PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON TABLE public.notification_types IS E'The notification types database. Ex: sms_notification , email_notification, phone_call.';
-- ddl-end --
COMMENT ON COLUMN public.notification_types.id IS E'The database unique identifier.';
-- ddl-end --
COMMENT ON COLUMN public.notification_types.alternative_id IS E'The numeric identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.notification_types.name IS E'The notification type display name.';
-- ddl-end --
COMMENT ON COLUMN public.notification_types.slug IS E'The notification type slug. Ex: sms_notification, email_notification.';
-- ddl-end --
COMMENT ON COLUMN public.notification_types.created_at IS E'The data of register creation.';
-- ddl-end --
COMMENT ON COLUMN public.notification_types.updated_at IS E'The data of register update.';
-- ddl-end --
COMMENT ON COLUMN public.notification_types.deleted_at IS E'The field to handle soft deletes.';
-- ddl-end --
ALTER TABLE public.notification_types OWNER TO postgres;
-- ddl-end --

-- object: public.user_notifications_consents | type: TABLE --
-- DROP TABLE IF EXISTS public.user_notifications_consents CASCADE;
CREATE TABLE public.user_notifications_consents (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	user_id uuid NOT NULL,
	notification_type_id uuid NOT NULL,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__user_notifications_consents PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.user_notifications_consents.id IS E'The database unique identifier.';
-- ddl-end --
COMMENT ON COLUMN public.user_notifications_consents.alternative_id IS E'The numeric identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.user_notifications_consents.created_at IS E'The data of register creation.';
-- ddl-end --
COMMENT ON COLUMN public.user_notifications_consents.updated_at IS E'The data of register update.';
-- ddl-end --
COMMENT ON COLUMN public.user_notifications_consents.deleted_at IS E'The field to handle soft deletes.';
-- ddl-end --
ALTER TABLE public.user_notifications_consents OWNER TO postgres;
-- ddl-end --

-- object: idx__uq__notification_type_name | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__notification_type_name CASCADE;
CREATE UNIQUE INDEX idx__uq__notification_type_name ON public.notification_types
USING btree
(
	name
)
WHERE (deleted_at is null);
-- ddl-end --

-- object: idx__part__uq__notification_type_name | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__notification_type_name CASCADE;
CREATE UNIQUE INDEX idx__part__uq__notification_type_name ON public.notification_types
USING btree
(
	name,
	deleted_at ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__uq__notification_type_name_slug | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__notification_type_name_slug CASCADE;
CREATE UNIQUE INDEX idx__uq__notification_type_name_slug ON public.notification_types
USING btree
(
	slug
)
WHERE (deleted_at is null);
-- ddl-end --

-- object: idx__part__uq__notification_type_name_slug | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__notification_type_name_slug CASCADE;
CREATE UNIQUE INDEX idx__part__uq__notification_type_name_slug ON public.notification_types
USING btree
(
	slug,
	deleted_at ASC NULLS FIRST
);
-- ddl-end --

-- object: fk_users_user_notifications_consents | type: CONSTRAINT --
-- ALTER TABLE public.user_notifications_consents DROP CONSTRAINT IF EXISTS fk_users_user_notifications_consents CASCADE;
ALTER TABLE public.user_notifications_consents ADD CONSTRAINT fk_users_user_notifications_consents FOREIGN KEY (user_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: fk_notification_types | type: CONSTRAINT --
-- ALTER TABLE public.user_notifications_consents DROP CONSTRAINT IF EXISTS fk_notification_types CASCADE;
ALTER TABLE public.user_notifications_consents ADD CONSTRAINT fk_notification_types FOREIGN KEY (notification_type_id)
REFERENCES public.notification_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: idx__uq__user_notification_consents | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__user_notification_consents CASCADE;
CREATE UNIQUE INDEX idx__uq__user_notification_consents ON public.user_notifications_consents
USING btree
(
	user_id,
	notification_type_id
)
WHERE (deleted_at is null);
-- ddl-end --

-- object: idx__part__uq__user_notification_consents | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__user_notification_consents CASCADE;
CREATE UNIQUE INDEX idx__part__uq__user_notification_consents ON public.user_notifications_consents
USING btree
(
	user_id,
	notification_type_id,
	deleted_at ASC NULLS FIRST
);
-- ddl-end --

-- object: public.events | type: TABLE --
-- DROP TABLE IF EXISTS public.events CASCADE;
CREATE TABLE public.events (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	event_type varchar(100),
	payload jsonb NOT NULL,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__events PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.events.id IS E'The database unique identifier.';
-- ddl-end --
COMMENT ON COLUMN public.events.alternative_id IS E'The numeric identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.events.event_type IS E'The event identifier  type.';
-- ddl-end --
COMMENT ON COLUMN public.events.payload IS E'The event payload.';
-- ddl-end --
COMMENT ON COLUMN public.events.created_at IS E'The data of register creation.';
-- ddl-end --
COMMENT ON COLUMN public.events.updated_at IS E'The data of register update.';
-- ddl-end --
COMMENT ON COLUMN public.events.deleted_at IS E'The field to handle soft deletes.';
-- ddl-end --
ALTER TABLE public.events OWNER TO postgres;
-- ddl-end --
