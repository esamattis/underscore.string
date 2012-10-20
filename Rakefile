# encoding: utf-8
task default: :test

desc 'Use UglifyJS to compress Underscore.string'
task :build do
  require 'uglifier'
  source = File.read('lib/underscore.string.js')
  compressed = Uglifier.compile(source, copyright: false)
  File.open('dist/underscore.string.min.js', 'w'){ |f| f.write compressed }
  compression_rate = compressed.length.to_f/source.length
  puts "compressed dist/underscore.string.min.js: #{compressed.length}/#{source.length} #{(compression_rate * 100).round}%"
end

desc 'Run tests'
task :test do
  exit(system('phantomjs ./test/run-qunit.js "test/index.html"'))
end