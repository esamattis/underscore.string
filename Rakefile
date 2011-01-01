require 'rubygems'
require 'closure-compiler'

desc 'Use the Closure Compiler to compress Underscore.string'
task :build do
  File.open('dist/underscore.string.min.js', 'w').write \
    Closure::Compiler.new.compile(File.open('src/underscore.string.js', 'r'))
end

task :publish do

end
