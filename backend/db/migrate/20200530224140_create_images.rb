class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :name
      t.string :source
      t.integer :win_code
      t.timestamps
    end
  end
end
