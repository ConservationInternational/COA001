class EnableUuidOsspExtension < ActiveRecord::Migration
  def change
    # For some reason the Postgres that Dave packaged into the Vagrant COA001DB box
    # doesn't have uuid-ossp.
    # TODO(yu): Find/package a Postgres that has the proper extension
    # enable_extension 'uuid-ossp'
  end
end
