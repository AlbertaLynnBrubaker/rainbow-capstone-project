puts "shoving 'the gays' back in the closet..."
Comment.destroy_all
Post.destroy_all
User.destroy_all

puts "creating new agents of change..."

bg = User.create(username: 'background', email:
  'bg@gmail.com', password: '123', password_confirmation: '123', full_name: 'Background', age: 1, bio: 'Blah blah blah', admin: true)

bg.avatar.attach(io: File.open(Rails.root.join(
  'background-colorful-rainbow-gradient.png')), filename: 'background-colorful-rainbow-gradient.png', content_type: 'image/png')

logo = User.create(username: 'logo', email:
  'logo@gmail.com', password: '123', password_confirmation: '123', full_name: 'Logo', age: 1, bio: 'Blah blah blah', admin: true)

logo.avatar.attach(io: File.open(Rails.root.join(
  'rainbow-logo.png')), filename: 'rainbow-logo.png', content_type: 'image/png')

admin = User.create(username: "Alie", password: "123", password_confirmation: "123", email: "findingalberta@gmail.com", full_name: "Alie Brubaker", age: 36, bio: "Just a smalltown girl livin in a lonely world", admin: true)

admin.avatar.attach(
  io: File.open(Rails.root.join('avatar_blank.png')), filename: 'avatar_blank.png', content_type: 'image/png')

while User.all.length <= 600 do 
  u = User.create(username: Faker::Internet.unique.username, password: "123", password_confirmation: "123", email: Faker::Internet.unique.email, full_name: Faker::Name.unique.name, age: Faker::Number.within(range: 13..45), bio: Faker::Hipster.paragraphs(number: 1) )
  u.avatar.attach(
    io: File.open(Rails.root.join('avatar_blank.png')), filename: 'avatar_blank.png', content_type: 'image/png')
end

puts "spreading the gay agenda..."

3000.times do
  Post.create(content: Faker::Hipster.paragraphs(number: 1), user_id: User.where('id > 2').sample.id)
end

puts "sewing the seeds of the destruction of the Cishet Hegemony..."

6000.times do
  Comment.create(content: Faker::Hipster.paragraphs(number: 1), post_id: Post.all.sample.id, user_id: User.where('id > 2').sample.id)
end

puts "finished creating the Anarco-Syndacalist Gay Paradise we all yearn for!"
