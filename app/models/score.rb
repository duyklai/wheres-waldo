class Score < ApplicationRecord
    belongs_to :photo
    default_scope -> { order(score: :asc) }
end
