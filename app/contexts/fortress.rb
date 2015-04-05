class Fortress
  class << self
    def string
      Guard.new(Type::STRING)
    end

    def boolean
      Guard.new(Type::BOOLEAN)
    end
  end

  def initialize(schema)
    @schema = schema
  end

  def validate!(hash)
    keys = @schema.keys
    keys.each do |key|
      guard = @schema[key]
      expected_type = guard.type
      value = hash[key]
      actual_type = value.class

      if actual_type == ::NilClass
        if guard.required?
          raise MissingRequiredKeyError.new("#{key} is a required key")
        end
      else
        if !expected_type.valid_ruby_types.include?(actual_type)
          raise TypeMismatchError.new("Expected #{expected_type}, got #{actual_type}")
        elsif !guard.valid?(value)
          raise InvalidValueError.new("#{value} is not one of #{guard.options.to_s}")
        end
      end
    end

    extra_keys = hash.keys - keys
    raise UnexpectedKeyError.new("Did not expect #{extra_keys.to_s}") unless extra_keys.empty?

    true
  end

  class Error < StandardError; end
  class TypeMismatchError < Error; end
  class UnexpectedKeyError < Error; end
  class MissingRequiredKeyError < Error; end
  class InvalidValueError < Error; end

  class Guard
    attr_reader :type
    attr_reader :required
    attr_reader :options

    def initialize(type)
      @type = type
    end

    def required
      @required = true
      self
    end

    def valid(*options)
      @options = options
      self
    end

    def valid?(value)
      if @options
        @options.include?(value)
      else
        true
      end
    end

    def required?
      @required
    end

    def optional?
      !required?
    end
  end

  class Type
    attr_reader :valid_ruby_types

    def initialize(name, *valid_ruby_types)
      @name = name
      @valid_ruby_types = valid_ruby_types
    end

    STRING = Type.new("String", ::String)
    BOOLEAN = Type.new("Boolean", ::TrueClass, ::FalseClass)

    def to_s
      "Fortress::#{@name}"
    end
  end
end
