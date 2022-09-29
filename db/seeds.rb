puts "shoving 'the gays' back in the closet..."
Comment.destroy_all
Post.destroy_all
Membership.destroy_all
Group.destroy_all
User.destroy_all

puts "creating new agents of change..."

pronouns = ["he/him", "she/her", "they/them"]

bg = User.create(username: 'background', email:
  'bg@gmail.com', password: '123', password_confirmation: '123', full_name: 'Background', pronouns: 'blah', age: 1, bio: 'Blah blah blah', admin: true)

bg.avatar.attach(io: File.open(Rails.root.join(
  'background-colorful-rainbow-gradient.png')), filename: 'background-colorful-rainbow-gradient.png', content_type: 'image/png')

logo = User.create(username: 'logo', email:
  'logo@gmail.com', password: '123', password_confirmation: '123', full_name: 'Logo', pronouns: 'blah', age: 1, bio: 'Blah blah blah', admin: true)

logo.avatar.attach(io: File.open(Rails.root.join(
  'rainbow-logo.png')), filename: 'rainbow-logo.png', content_type: 'image/png')

admin = User.create(username: "Alie", password: "123", password_confirmation: "123", email: "findingalberta@gmail.com", full_name: "Alie Brubaker", pronouns: 'she/her', age: 36, bio: "Just a smalltown girl livin in a lonely world", admin: true)

admin.avatar.attach(
  io: File.open(Rails.root.join('avatar_blank.png')), filename: 'avatar_blank.png', content_type: 'image/png')

while User.all.length <= 40 do 
  u = User.create(username: Faker::Internet.unique.username, password: "123", password_confirmation: "123", email: Faker::Internet.unique.email, full_name: Faker::Name.unique.name, pronouns: pronouns.sample, age: Faker::Number.within(range: 13..45), bio: Faker::Hipster.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 2) )
  u.avatar.attach(
    io: File.open(Rails.root.join('avatar_blank.png')), filename: 'avatar_blank.png', content_type: 'image/png')
end

puts "forming elite cadres of post apocalypse trans cat-girl hunting squads"

while Group.all.length <=10 do
  g = Group.create(title: Faker::Hipster.word, founder: User.all.sample.full_name, description: Faker::Hipster.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 6))

  if(g.valid?)  
    a = Membership.create(group_id: g.id, user_id: User.where('id > 2').sample.id, is_admin: true)



    10.times do
      Membership.create(group_id: g.id, user_id: User.where('id > 2').sample.id)
      puts "memberships"
    end

    if(g.memberships.length > 0)
      20.times do
        po = Post.create(content: Faker::Hipster.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 6), user_id: g.memberships.sample.user_id, group_id: g.id )
        puts g.memberships.sample.user_id
      
        rand(1..3).times do
        Comment.create(content: Faker::Hipster.paragraph(sentence_count: 1, supplemental: false, random_sentences_to_add: 3), post_id: po.id, user_id: g.memberships.sample.user_id)
        end
        puts "posts and comments"
      end
    end
  end
  puts "group"
end

# puts "spreading the gay agenda..."

# 20.times do
#   Post.create(content: Faker::Hipster.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 6), user_id: User.where('id > 2').sample.id, group_id: nil)
# end

# puts "sewing the seeds of the destruction of the Cishet Hegemony..."

# 20.times do
#   Comment.create(content: Faker::Hipster.paragraph(sentence_count: 1, supplemental: false, random_sentences_to_add: 3), post_id: Post.all.sample.id, user_id: User.where('id > 2').sample.id)
# end



puts "finished creating the Anarco-Syndacalist Gay Paradise we all yearn for!"
