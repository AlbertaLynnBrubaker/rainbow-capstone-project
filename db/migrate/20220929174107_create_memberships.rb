class CreateMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships do |t|
      t.belongs_to :group, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.boolean :is_admin, default: false
      t.boolean :is_moderator, default: false

      t.timestamps
    end
  end
end
