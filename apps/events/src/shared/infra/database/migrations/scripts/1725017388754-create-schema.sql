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
	updated_at timestamp with time zone NOT NULL,
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

-- object: public.events | type: TABLE --
-- DROP TABLE IF EXISTS public.events CASCADE;
CREATE TABLE public.events (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	event_type varchar(100) NOT NULL,
	payload jsonb NOT NULL,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp with time zone NOT NULL,
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