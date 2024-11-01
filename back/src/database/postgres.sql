--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--



ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: event_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_categories (
    id integer NOT NULL,
    event_category_name character varying NOT NULL,
    display_order integer NOT NULL
);


ALTER TABLE public.event_categories OWNER TO postgres;

--
-- Name: event_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_categories_id_seq OWNER TO postgres;

--
-- Name: event_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_categories_id_seq OWNED BY public.event_categories.id;


--
-- Name: event_enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_enrollments (
    id integer NOT NULL,
    id_event integer NOT NULL,
    id_user integer NOT NULL,
    description character varying,
    registration_date_time timestamp without time zone,
    attended boolean,
    observations character varying,
    rating integer
);


ALTER TABLE public.event_enrollments OWNER TO postgres;

--
-- Name: event_enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_enrollments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_enrollments_id_seq OWNER TO postgres;

--
-- Name: event_enrollments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_enrollments_id_seq OWNED BY public.event_enrollments.id;


--
-- Name: event_locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_locations (
    id integer NOT NULL,
    id_location integer NOT NULL,
    event_location_name character varying NOT NULL,
    full_address character varying NOT NULL,
    max_capacity character varying NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    id_creator_user integer NOT NULL
);


ALTER TABLE public.event_locations OWNER TO postgres;

--
-- Name: event_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_locations_id_seq OWNER TO postgres;

--
-- Name: event_locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_locations_id_seq OWNED BY public.event_locations.id;


--
-- Name: event_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_tags (
    id integer NOT NULL,
    id_event integer NOT NULL,
    id_tag integer NOT NULL
);


ALTER TABLE public.event_tags OWNER TO postgres;

--
-- Name: event_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_tags_id_seq OWNER TO postgres;

--
-- Name: event_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_tags_id_seq OWNED BY public.event_tags.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    event_name character varying NOT NULL,
    description character varying NOT NULL,
    id_event_category integer NOT NULL,
    id_event_location integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    duration_in_minutes integer NOT NULL,
    price numeric NOT NULL,
    enabled_for_enrollment boolean NOT NULL,
    max_assistance integer NOT NULL,
    id_creator_user integer NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    location_name character varying NOT NULL,
    id_province integer NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_seq OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: provinces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provinces (
    id integer NOT NULL,
    province_name character varying NOT NULL,
    full_name character varying NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    display_order integer NOT NULL
);


ALTER TABLE public.provinces OWNER TO postgres;

--
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.provinces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.provinces_id_seq OWNER TO postgres;

--
-- Name: provinces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.provinces_id_seq OWNED BY public.provinces.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    tag_name character varying NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: event_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_categories ALTER COLUMN id SET DEFAULT nextval('public.event_categories_id_seq'::regclass);


--
-- Name: event_enrollments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments ALTER COLUMN id SET DEFAULT nextval('public.event_enrollments_id_seq'::regclass);


--
-- Name: event_locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations ALTER COLUMN id SET DEFAULT nextval('public.event_locations_id_seq'::regclass);


--
-- Name: event_tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags ALTER COLUMN id SET DEFAULT nextval('public.event_tags_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: provinces id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provinces ALTER COLUMN id SET DEFAULT nextval('public.provinces_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: event_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_categories (id, event_category_name, display_order) VALUES (1, 'Music', 1);
INSERT INTO public.event_categories (id, event_category_name, display_order) VALUES (2, 'Art', 2);
INSERT INTO public.event_categories (id, event_category_name, display_order) VALUES (3, 'Technology', 3);
INSERT INTO public.event_categories (id, event_category_name, display_order) VALUES (5, 'Science', 5);
INSERT INTO public.event_categories (id, event_category_name, display_order) VALUES (6, 'Food', 6);
INSERT INTO public.event_categories (id, event_category_name, display_order) VALUES (8, 'hola', 9);
INSERT INTO public.event_categories (id, event_category_name, display_order) VALUES (4, 'holaa', 4);


--
-- Data for Name: event_enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES (1, 1, 1, 'Registered for concert', '2024-05-01 10:00:00', false, '', 0);
INSERT INTO public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES (3, 3, 3, 'Registered for tech talk', '2024-05-03 12:00:00', false, '', 0);
INSERT INTO public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES (5, 2, 3, 'Registered for science expo', '2024-05-05 10:00:00', false, '', 0);
INSERT INTO public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES (6, 3, 1, 'Registered for cooking class', '2024-05-06 11:00:00', false, '', 0);
INSERT INTO public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES (4, 1, 2, 'Registered for sports event', '2024-05-04 09:00:00', false, '', 2);
INSERT INTO public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES (2, 3, 7, 'sasasas', '2024-11-01 13:57:41.96', true, 'saaaaaaaaaaaaaaaaaaaa', 4);
INSERT INTO public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES (7, 3, 7, 'uy', '2024-11-01 14:01:00.125', true, 'j', 1);
INSERT INTO public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES (9, 3, 7, 'null', '2024-11-01 14:10:16.904', false, 'null', NULL);
INSERT INTO public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES (10, 3, 7, 'u9u', '2024-11-01 14:10:16.904', true, '989', 8);


--
-- Data for Name: event_locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_locations (id, id_location, event_location_name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES (1, 1, 'Main Hall', '123 Main St', '100', 40.7128, -74.0060, 1);
INSERT INTO public.event_locations (id, id_location, event_location_name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES (2, 2, 'Conference Room', '456 Elm St', '50', 34.0522, -118.2437, 2);
INSERT INTO public.event_locations (id, id_location, event_location_name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES (3, 3, 'Open Space', '789 Oak St', '200', 37.7749, -122.4194, 3);
INSERT INTO public.event_locations (id, id_location, event_location_name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES (4, 1, 'Stadium', '101 Stadium Ave', '500', 40.7128, -74.0060, 2);
INSERT INTO public.event_locations (id, id_location, event_location_name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES (5, 2, 'Exhibition Center', '202 Expo Blvd', '300', 34.0522, -118.2437, 3);
INSERT INTO public.event_locations (id, id_location, event_location_name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES (6, 3, 'Cooking School', '789 Chef St', '50', 37.7749, -122.4194, 1);


--
-- Data for Name: event_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_tags (id, id_event, id_tag) VALUES (1, 1, 1);
INSERT INTO public.event_tags (id, id_event, id_tag) VALUES (2, 2, 2);
INSERT INTO public.event_tags (id, id_event, id_tag) VALUES (3, 3, 3);
INSERT INTO public.event_tags (id, id_event, id_tag) VALUES (4, 1, 4);
INSERT INTO public.event_tags (id, id_event, id_tag) VALUES (5, 2, 5);
INSERT INTO public.event_tags (id, id_event, id_tag) VALUES (6, 3, 6);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events (id, event_name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES (3, 'Tech Talk', 'Latest in technology', 3, 3, '2024-06-03 14:00:00', 90, 0.00, true, 200, 3);
INSERT INTO public.events (id, event_name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES (4, 'Football Match', 'Live sports event', 4, 4, '2024-06-04 15:00:00', 180, 30.00, true, 200, 2);
INSERT INTO public.events (id, event_name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES (5, 'Science Expo', 'Cutting-edge science exhibition', 5, 5, '2024-06-05 09:00:00', 240, 10.00, true, 150, 3);
INSERT INTO public.events (id, event_name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES (6, 'Cooking Class', 'Learn culinary skills', 6, 6, '2024-06-06 12:00:00', 120, 25.00, true, 20, 1);
INSERT INTO public.events (id, event_name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES (2, 'Art Exhibition', 'Modern art gallery', 2, 2, '2024-12-10 10:00:00', 180, 20.00, true, 50, 2);
INSERT INTO public.events (id, event_name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES (20, 'hola', 'description', 3, 2, '2022-12-12 00:00:00', 120, 50.00, true, 100, 3);
INSERT INTO public.events (id, event_name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES (1, 'Concert', 'Live music event', 1, 1, '2025-06-01 18:00:00', 120, 50.00, true, 100, 1);


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.locations (id, location_name, id_province, latitude, longitude) VALUES (1, 'New York', 1, 40.7128, -74.0060);
INSERT INTO public.locations (id, location_name, id_province, latitude, longitude) VALUES (2, 'Los Angeles', 2, 34.0522, -118.2437);
INSERT INTO public.locations (id, location_name, id_province, latitude, longitude) VALUES (3, 'San Francisco', 3, 37.7749, -122.4194);
INSERT INTO public.locations (id, location_name, id_province, latitude, longitude) VALUES (4, 'Stadium', 1, 40.7128, -74.0060);
INSERT INTO public.locations (id, location_name, id_province, latitude, longitude) VALUES (5, 'Exhibition Center', 2, 34.0522, -118.2437);
INSERT INTO public.locations (id, location_name, id_province, latitude, longitude) VALUES (6, 'Cooking School', 3, 37.7749, -122.4194);


--
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.provinces (id, province_name, full_name, latitude, longitude, display_order) VALUES (1, 'NY', 'New York', 40.7128, -74.0060, 1);
INSERT INTO public.provinces (id, province_name, full_name, latitude, longitude, display_order) VALUES (2, 'CA', 'California', 34.0522, -118.2437, 2);
INSERT INTO public.provinces (id, province_name, full_name, latitude, longitude, display_order) VALUES (3, 'CA', 'California', 37.7749, -122.4194, 3);
INSERT INTO public.provinces (id, province_name, full_name, latitude, longitude, display_order) VALUES (4, 'TX', 'Texas', 30.2672, -97.7431, 4);
INSERT INTO public.provinces (id, province_name, full_name, latitude, longitude, display_order) VALUES (5, 'FL', 'Florida', 27.9944, -81.7603, 5);
INSERT INTO public.provinces (id, province_name, full_name, latitude, longitude, display_order) VALUES (6, 'IL', 'Illinois', 40.6331, -89.3985, 6);


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tags (id, tag_name) VALUES (1, 'Music');
INSERT INTO public.tags (id, tag_name) VALUES (2, 'Art');
INSERT INTO public.tags (id, tag_name) VALUES (3, 'Technology');
INSERT INTO public.tags (id, tag_name) VALUES (4, 'Sports');
INSERT INTO public.tags (id, tag_name) VALUES (5, 'Science');
INSERT INTO public.tags (id, tag_name) VALUES (6, 'Food');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, first_name, last_name, username, password) VALUES (1, 'John', 'Doe', 'jdoe', 'password1');
INSERT INTO public.users (id, first_name, last_name, username, password) VALUES (2, 'Jane', 'Smith', 'jsmith', 'password2');
INSERT INTO public.users (id, first_name, last_name, username, password) VALUES (3, 'Alice', 'Johnson', 'ajohnson', 'password3');
INSERT INTO public.users (id, first_name, last_name, username, password) VALUES (4, 'Michael', 'Brown', 'mbrown', 'password4');
INSERT INTO public.users (id, first_name, last_name, username, password) VALUES (5, 'Emily', 'Davis', 'edavis', 'password5');
INSERT INTO public.users (id, first_name, last_name, username, password) VALUES (6, 'William', 'Martinez', 'wmartinez', 'password6');
INSERT INTO public.users (id, first_name, last_name, username, password) VALUES (7, 'a', 'a', 'a', '$2a$10$6zOb5XoxbTI86QhVvvhde.9yJl6pBYnuZgaSC1NUtL35KYlCHCawe');
INSERT INTO public.users (id, first_name, last_name, username, password) VALUES (8, 'aaaa', 'aaaa', 'aaaa', '$2a$10$pSv/Utb37McHsNqSBerKEe1heqOjkq1hv50xHJ2xYoGyZKTxU5XKK');


--
-- Name: event_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_categories_id_seq', 1, true);


--
-- Name: event_enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_enrollments_id_seq', 10, true);


--
-- Name: event_locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_locations_id_seq', 1, false);


--
-- Name: event_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_tags_id_seq', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 1, false);


--
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provinces_id_seq', 1, false);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: event_categories PK_EventCategories; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_categories
    ADD CONSTRAINT "PK_EventCategories" PRIMARY KEY (id);


--
-- Name: event_enrollments PK_EventEnrollments; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT "PK_EventEnrollments" PRIMARY KEY (id);


--
-- Name: event_locations PK_EventLocations; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT "PK_EventLocations" PRIMARY KEY (id);


--
-- Name: event_tags PK_EventTags; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT "PK_EventTags" PRIMARY KEY (id);


--
-- Name: events PK_Events; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "PK_Events" PRIMARY KEY (id);


--
-- Name: provinces PK_Provinces ; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT "PK_Provinces " PRIMARY KEY (id);


--
-- Name: tags PK_Tags; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "PK_Tags" PRIMARY KEY (id);


--
-- Name: users PK_Users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_Users" PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: event_enrollments FK_Event_enrollments_Events; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT "FK_Event_enrollments_Events" FOREIGN KEY (id_event) REFERENCES public.events(id) NOT VALID;


--
-- Name: event_enrollments FK_Event_enrollments_Users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT "FK_Event_enrollments_Users" FOREIGN KEY (id_user) REFERENCES public.users(id) NOT VALID;


--
-- Name: event_tags FK_Event_tags_Event; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT "FK_Event_tags_Event" FOREIGN KEY (id_event) REFERENCES public.events(id) NOT VALID;


--
-- Name: event_tags FK_Event_tags_Tags; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT "FK_Event_tags_Tags" FOREIGN KEY (id_tag) REFERENCES public.tags(id) NOT VALID;


--
-- Name: event_locations FK_EventlocationLocations; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT "FK_EventlocationLocations" FOREIGN KEY (id_location) REFERENCES public.locations(id) NOT VALID;


--
-- Name: events FK_EventsEvent_categories; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_EventsEvent_categories" FOREIGN KEY (id_event_category) REFERENCES public.event_categories(id) NOT VALID;


--
-- Name: events FK_EventsEvent_locations; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_EventsEvent_locations" FOREIGN KEY (id_event_location) REFERENCES public.event_locations(id) NOT VALID;


--
-- Name: events FK_EventsUsers; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_EventsUsers" FOREIGN KEY (id_creator_user) REFERENCES public.users(id) NOT VALID;


--
-- Name: locations FK_LocationsProvince; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT "FK_LocationsProvince" FOREIGN KEY (id_province) REFERENCES public.provinces(id) NOT VALID;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

