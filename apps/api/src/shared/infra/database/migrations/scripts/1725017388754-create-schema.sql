-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.2
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: new_database | type: DATABASE --
-- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database;
-- ddl-end --


-- object: public.template | type: TABLE --
-- DROP TABLE IF EXISTS public.template CASCADE;
CREATE TABLE public.template (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp with time zone,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__template PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.template.id IS E'The unique identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.template.alternative_id IS E'Numeric value that can be used as tag code for register.';
-- ddl-end --
COMMENT ON COLUMN public.template.created_at IS E'The date of creation of the register.';
-- ddl-end --
COMMENT ON COLUMN public.template.updated_at IS E'The update date value of the register.';
-- ddl-end --
COMMENT ON COLUMN public.template.deleted_at IS E'The value of deletion of the register.';
-- ddl-end --
ALTER TABLE public.template OWNER TO postgres;
-- ddl-end --

-- object: postgis | type: EXTENSION --
-- DROP EXTENSION IF EXISTS postgis CASCADE;
-- CREATE EXTENSION postgis
-- WITH SCHEMA public;
-- ddl-end --

-- object: public.interest_points | type: TABLE --
-- DROP TABLE IF EXISTS public.interest_points CASCADE;
CREATE TABLE public.interest_points (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	interest_point_category_id uuid NOT NULL,
	name varchar(100) NOT NULL,
	description text,
	"position" point NOT NULL,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp with time zone,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__interest_points PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.interest_points.id IS E'The unique identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.interest_points.alternative_id IS E'Numeric value that can be used as tag code for register.';
-- ddl-end --
COMMENT ON COLUMN public.interest_points.name IS E'The name of the interest point';
-- ddl-end --
COMMENT ON COLUMN public.interest_points.description IS E'The descripition of the intereset point. Ex: Good place to have a breakfast with the family';
-- ddl-end --
COMMENT ON COLUMN public.interest_points."position" IS E'The latitude and longitude of the interest point.';
-- ddl-end --
COMMENT ON COLUMN public.interest_points.created_at IS E'The date of creation of the register.';
-- ddl-end --
COMMENT ON COLUMN public.interest_points.updated_at IS E'The update date value of the register.';
-- ddl-end --
COMMENT ON COLUMN public.interest_points.deleted_at IS E'The value of deletion of the register.';
-- ddl-end --
ALTER TABLE public.interest_points OWNER TO postgres;
-- ddl-end --

-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password_hash varchar(255) NOT NULL,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp with time zone,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__users PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.users.id IS E'The unique identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.users.alternative_id IS E'Numeric value that can be used as tag code for register.';
-- ddl-end --
COMMENT ON COLUMN public.users.created_at IS E'The date of creation of the register.';
-- ddl-end --
COMMENT ON COLUMN public.users.updated_at IS E'The update date value of the register.';
-- ddl-end --
COMMENT ON COLUMN public.users.deleted_at IS E'The value of deletion of the register.';
-- ddl-end --
ALTER TABLE public.users OWNER TO postgres;
-- ddl-end --

-- object: idx__uq__email | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__email CASCADE;
CREATE UNIQUE INDEX idx__uq__email ON public.users
USING btree
(
	email,
	deleted_at ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__email | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__email CASCADE;
CREATE UNIQUE INDEX idx__part__uq__email ON public.users
USING btree
(
	email
)
WHERE (deleted_at is null);
-- ddl-end --

-- object: public.interest_point_categories | type: TABLE --
-- DROP TABLE IF EXISTS public.interest_point_categories CASCADE;
CREATE TABLE public.interest_point_categories (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp with time zone,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__interest_point_categories PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.interest_point_categories.id IS E'The unique identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.interest_point_categories.alternative_id IS E'Numeric value that can be used as tag code for register.';
-- ddl-end --
COMMENT ON COLUMN public.interest_point_categories.name IS E'The category name. Ex: Restaurant';
-- ddl-end --
COMMENT ON COLUMN public.interest_point_categories.created_at IS E'The date of creation of the register.';
-- ddl-end --
COMMENT ON COLUMN public.interest_point_categories.updated_at IS E'The update date value of the register.';
-- ddl-end --
COMMENT ON COLUMN public.interest_point_categories.deleted_at IS E'The value of deletion of the register.';
-- ddl-end --
ALTER TABLE public.interest_point_categories OWNER TO postgres;
-- ddl-end --

-- object: idx__uq__interest_point_name | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__interest_point_name CASCADE;
CREATE UNIQUE INDEX idx__uq__interest_point_name ON public.interest_point_categories
USING btree
(
	name,
	deleted_at ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__intereset_point_name | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__intereset_point_name CASCADE;
CREATE UNIQUE INDEX idx__part__uq__intereset_point_name ON public.interest_point_categories
USING btree
(
	name
)
WHERE (deleted_at is null);
-- ddl-end --

-- object: fk_interest_point_categories_interest_points | type: CONSTRAINT --
-- ALTER TABLE public.interest_points DROP CONSTRAINT IF EXISTS fk_interest_point_categories_interest_points CASCADE;
ALTER TABLE public.interest_points ADD CONSTRAINT fk_interest_point_categories_interest_points FOREIGN KEY (interest_point_category_id)
REFERENCES public.interest_point_categories (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.user_interest_points | type: TABLE --
-- DROP TABLE IF EXISTS public.user_interest_points CASCADE;
CREATE TABLE public.user_interest_points (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	user_id uuid NOT NULL,
	interest_point_id uuid NOT NULL,
	created_at timestamp with time zone NOT NULL,
	updated_at timestamp with time zone,
	deleted_at timestamp with time zone,
	CONSTRAINT pk__user_interest_points PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.user_interest_points.id IS E'The unique identifier of the register.';
-- ddl-end --
COMMENT ON COLUMN public.user_interest_points.alternative_id IS E'Numeric value that can be used as tag code for register.';
-- ddl-end --
COMMENT ON COLUMN public.user_interest_points.created_at IS E'The date of creation of the register.';
-- ddl-end --
COMMENT ON COLUMN public.user_interest_points.updated_at IS E'The update date value of the register.';
-- ddl-end --
COMMENT ON COLUMN public.user_interest_points.deleted_at IS E'The value of deletion of the register.';
-- ddl-end --
ALTER TABLE public.user_interest_points OWNER TO postgres;
-- ddl-end --

-- object: fk_users_user_interest_points | type: CONSTRAINT --
-- ALTER TABLE public.user_interest_points DROP CONSTRAINT IF EXISTS fk_users_user_interest_points CASCADE;
ALTER TABLE public.user_interest_points ADD CONSTRAINT fk_users_user_interest_points FOREIGN KEY (user_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: fk_interest_points_user_interest_points | type: CONSTRAINT --
-- ALTER TABLE public.user_interest_points DROP CONSTRAINT IF EXISTS fk_interest_points_user_interest_points CASCADE;
ALTER TABLE public.user_interest_points ADD CONSTRAINT fk_interest_points_user_interest_points FOREIGN KEY (interest_point_id)
REFERENCES public.interest_points (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: idx__uq__user_interest_point | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__user_interest_point CASCADE;
CREATE UNIQUE INDEX idx__uq__user_interest_point ON public.user_interest_points
USING btree
(
	user_id,
	interest_point_id,
	deleted_at ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__user_interest_point | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__user_interest_point CASCADE;
CREATE UNIQUE INDEX idx__part__uq__user_interest_point ON public.user_interest_points
USING btree
(
	user_id,
	interest_point_id
)
WHERE (deleted_at is null);
-- ddl-end --


