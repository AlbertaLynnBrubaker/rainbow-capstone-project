class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.string :full_name
      t.integer :age, default: 0
      t.text :bio, default: nil
      t.string :pronouns, default: ""
      t.boolean :admin, default: false

      t.timestamps
    end
  end
end
