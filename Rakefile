require 'rubygems'
require 'closure-compiler'

desc "Use the Closure Compiler to compress Underscore.strings"
task :build do
  js  = File.open('underscore.strings.js', 'r')
  min = Closure::Compiler.new.compile(js)
  File.open('underscore.strings-min.js', 'w') {|f| f.write(min) }
end

