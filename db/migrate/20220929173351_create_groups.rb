class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.string :title
      t.string :founder
      t.text :description
      t.boolean :is_private, default: false

      t.timestamps
    end
  end
end
