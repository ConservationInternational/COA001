# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150404174813) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.uuid     "token"
    t.integer  "state_id",       null: false
    t.string   "street_address"
    t.string   "city"
    t.string   "zipcode"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "birds", force: :cascade do |t|
    t.uuid     "token",                            null: false
    t.text     "comment"
    t.boolean  "refound",                          null: false
    t.boolean  "collected",                        null: false
    t.text     "collected_comment"
    t.boolean  "oil",                              null: false
    t.text     "oil_comment"
    t.integer  "found_location_type",  default: 0, null: false
    t.integer  "foot_condition_type",  default: 0, null: false
    t.integer  "eye_type",             default: 0, null: false
    t.integer  "entanglement_type"
    t.text     "entanglement_comment"
    t.integer  "tie_location_type"
    t.integer  "closest_tie_color",    default: 0
    t.integer  "middle_tie_color",     default: 0
    t.integer  "farthest_tie_color",   default: 0
    t.text     "tie_location_comment"
    t.integer  "verification_method",  default: 0, null: false
    t.text     "verification_comment"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  create_table "foot_type_families", force: :cascade do |t|
    t.uuid     "token",       null: false
    t.integer  "toe_type_id", null: false
    t.string   "name",        null: false
    t.string   "description"
    t.boolean  "active",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "groups", force: :cascade do |t|
    t.uuid     "token",               null: false
    t.integer  "foot_type_family_id", null: false
    t.string   "name",                null: false
    t.string   "code",                null: false
    t.string   "description"
    t.boolean  "active",              null: false
    t.boolean  "composite",           null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "species", force: :cascade do |t|
    t.uuid     "token",               null: false
    t.integer  "subgroup_id",         null: false
    t.string   "code",                null: false
    t.string   "name",                null: false
    t.integer  "tarsus_min",          null: false
    t.integer  "tarsus_max",          null: false
    t.integer  "wing_min",            null: false
    t.integer  "wing_max",            null: false
    t.integer  "bill_min",            null: false
    t.integer  "bill_max",            null: false
    t.string   "verification_source", null: false
    t.boolean  "sex_difference",      null: false
    t.boolean  "active",              null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "states", force: :cascade do |t|
    t.uuid     "token",      null: false
    t.string   "code",       null: false
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subgroups", force: :cascade do |t|
    t.uuid     "token",      null: false
    t.integer  "group_id",   null: false
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "toe_types", force: :cascade do |t|
    t.uuid     "token",      null: false
    t.string   "code",       null: false
    t.string   "name",       null: false
    t.boolean  "active",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.uuid     "token",           null: false
    t.string   "email",           null: false
    t.string   "hashed_password", null: false
    t.string   "salt",            null: false
    t.string   "first_name",      null: false
    t.string   "middle_initial"
    t.string   "last_name",       null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
