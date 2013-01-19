
rm -R $HOME/.m2/repository/co/uk/whisk

rm -R lib

mvn dependency:copy-dependencies -DoutputDirectory=lib -DincludeScope=compile
